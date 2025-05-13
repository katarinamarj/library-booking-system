import { IsNull } from "typeorm";
import { AppDataSource } from "../db";
import { Library } from "../entities/Library";

const repo = AppDataSource.getRepository(Library)

export class LibraryService {
    static async getLibraries(){
        return await repo.find({
            select: {
                libraryId: true,
                name: true,
                location: true,
                createdAt: true,
                updatedAt: true
            },
            where: {
                deletedAt: IsNull()
            }
        })
    }

    static async getLibraryById(id: number) {
    const data = await repo.findOne({
        select: {
            libraryId: true,
            name: true,
            location: true,
            createdAt: true,
            updatedAt: true
        },
        where: {
            libraryId: id,
            deletedAt: IsNull()
        }
    });

    if (data == null)
        throw new Error('NOT_FOUND');

    return data;    
    }

    static async createLibrary(model: Library){
        await repo.save({
            name: model.name,
            location: model.location,
            createdAt: new Date()
        })
    }

    static async updateLibrary(id: number, model: Library){
        const library = await this.getLibraryById(id)
        library.name = model.name
        library.location = model.location
        library.updatedAt = new Date()
        await repo.save(library)
    }

    static async deleteLibrary(id: number){
        const library = await this.getLibraryById(id)
        library.deletedAt = new Date()
        await repo.save(library)
    }
}