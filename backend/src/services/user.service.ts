import { IsNull } from "typeorm";
import { AppDataSource } from "../db";
import { User } from "../entities/User";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import type { Response } from "express";
import { dataExists } from "../utils";

const repo = AppDataSource.getRepository(User)
const tokenSecret = process.env.JWT_SECRET
const accessTTL = process.env.JWT_ACCESS_TTL
const refreshTTL = process.env.JWT_REFRESH_TTL

export class UserService {

    static async login(email: string, password: string) {
        const user = await this.getUserByEmail(email)
        if (await bcrypt.compare(password, user.password)) {
            const payload = {
                id: user.userId,
                email: user.email,
            }

            return {
                email: user.email,
                access: jwt.sign(payload, tokenSecret!, { expiresIn: accessTTL }),
                refresh: jwt.sign(payload, tokenSecret!, { expiresIn: refreshTTL })
            }
        }

        throw new Error('EMAIL_OR_PASSWORD_INCORRECT')
    }

    static async refreshToken(token: string) {
        const decoded: any = jwt.verify(token, tokenSecret!)
        const user = await this.getUserByEmail(decoded.email)
        const payload = {
            id: user.userId,
            email: user.email,
        }

        return {
            email: user.email,
            access: jwt.sign(payload, tokenSecret!, {expiresIn: accessTTL}),
            refresh: token
        }
    }

    static async register(model: User) {
        const hashed = await bcrypt.hash(model.password, 12)

        await repo.save({
            firstName: model.firstName,
            lastName: model.lastName,
            email: model.email,
            phone: model.phone,
            password: hashed,
            createdAt: new Date()
        })
    }

    static async self(email: string) {
        const data = await repo.findOne({
            select: {
                userId: true,
                firstName: true,
                lastName: true,
                email: true,
                phone: true,
            
            },
            where: {
                email: email,
                deletedAt: IsNull(),  
            }
        })

        if (data == null)
            throw new Error('NOT_FOUND')

        return data
    }

    static async validateToken(req: any, res: Response, next: Function) {
        const whitelisted = [
            '/api/user/login',
            '/api/user/refresh',
            '/api/user/register'
        ]

        if (whitelisted.includes(req.path)) {
            next()
            return
        }

        const auth = req.headers['authorization']
        const token = auth &&  auth.split(' ')[1]

        if (token == undefined) {
            res.status(401).json({
                message: 'NO_TOKEN_FOUND',
                timestamp: new Date()
            })
            return
        }

        jwt.verify(token, tokenSecret!, (err: any, user: any) => {
            if (err) {
                res.status(403).json({
                    message: 'INVALID_TOKEN',
                    timestamp: new Date()
                })
                return
            }

            req.user = user
            next()
        })
    }

    static async getUserByEmail(email: string) {
        const data = await repo.findOne({
            where: {
                email: email,
                deletedAt: IsNull()
            }
        })

       return dataExists(data)
    }
    
    static async getUserIdByEmail(email: string) {
        const user = await repo.findOne({
            select: {
                userId: true
            },
            where: {
                email: email,
                deletedAt: IsNull()
            }
        })

        return dataExists(user).userId
    }

    static async updateUser(email: string, update: Partial<User>) {
        const user = await this.getUserByEmail(email)

        if (!user) throw new Error('USER_NOT_FOUND')

        if (update.password) {
            update.password = await bcrypt.hash(update.password, 12)
        } else {
            delete update.password
        }

        Object.assign(user, update)
        
        await repo.save({ ...user, updated_at: new Date() })

        return {
            userId: user.userId,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone
        }
    }

}