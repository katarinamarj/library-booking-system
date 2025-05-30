import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";
import { Library } from "./Library";

@Index("fk_reservation_user_id_idx", ["userId"], {})
@Index("fk_reservation_library_id_idx", ["libraryId"], {})
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

  @Column("int", { name: "library_id", unsigned: true })
  libraryId: number;

  @Column("varchar", { name: "google_book_id", length: 64, nullable: true })
  googleBookId: string | null;

  @Column("varchar", { name: "book_title", length: 255, nullable: true })
  bookTitle: string | null;

  @Column("varchar", { name: "book_author", length: 255, nullable: true })
  bookAuthor: string | null;

  @Column("datetime", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column("datetime", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @Column("datetime", { name: "deleted_at", nullable: true })
  deletedAt: Date | null;

  @ManyToOne(() => User, (user) => user.reservations, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "userId" }])
  user: User;

  @ManyToOne(() => Library, (library) => library.reservations)
  @JoinColumn([{ name: "library_id", referencedColumnName: "libraryId" }])
  library: Library;
}
