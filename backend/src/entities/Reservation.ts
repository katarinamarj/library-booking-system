import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Book } from "./Book";
import { Library } from "./Library";
import { User } from "./User";

@Index("fk_reservation_book_id_idx", ["bookId"], {})
@Index("fk_reservation_library_id_idx", ["libraryId"], {})
@Index("fk_reservation_user_id_idx", ["userId"], {})
@Entity("reservation", { schema: "library_db" })
export class Reservation {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "reservation_id",
    unsigned: true,
  })
  reservationId: number;

  @Column("int", { name: "user_id", unsigned: true })
  userId: number;

  @Column("int", { name: "book_id", unsigned: true })
  bookId: number;

  @Column("int", { name: "library_id", unsigned: true })
  libraryId: number;

  @Column("datetime", { name: "reserved_at", nullable: true })
  reservedAt: Date | null;

  @Column("enum", {
    name: "status",
    nullable: true,
    enum: ["pending", "approved", "returned"],
  })
  status: "pending" | "approved" | "returned" | null;

  @Column("datetime", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column("datetime", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @Column("datetime", { name: "deleted_at", nullable: true })
  deletedAt: Date | null;

  @ManyToOne(() => Book, (book) => book.reservations, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "book_id", referencedColumnName: "bookId" }])
  book: Book;

  @ManyToOne(() => Library, (library) => library.reservations, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "library_id", referencedColumnName: "libraryId" }])
  library: Library;

  @ManyToOne(() => User, (user) => user.reservations, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "userId" }])
  user: User;
}
