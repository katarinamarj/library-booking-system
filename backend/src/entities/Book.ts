import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Reservation } from "./Reservation";

@Index("uq_book_google_id", ["googleId"], { unique: true })
@Entity("book", { schema: "library_db" })
export class Book {
  @PrimaryGeneratedColumn({ type: "int", name: "book_id", unsigned: true })
  bookId: number;

  @Column("varchar", { name: "google_id", unique: true, length: 255 })
  googleId: string;

  @Column("varchar", { name: "title", length: 255 })
  title: string;

  @Column("varchar", { name: "authors", length: 255 })
  authors: string;

  @OneToMany(() => Reservation, (reservation) => reservation.book)
  reservations: Reservation[];
}
