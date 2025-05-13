import { configDotenv } from "dotenv";
import { DataSource } from "typeorm";
import { Book } from "./entities/Book";
import { Library } from "./entities/Library";
import { Reservation } from "./entities/Reservation";
import { User } from "./entities/User";

configDotenv()
export const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [
        Book, Library, Reservation, User
    ],
    logging: false
})