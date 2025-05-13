import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Reservation } from "./Reservation";

@Entity("library", { schema: "library_db" })
export class Library {
  @PrimaryGeneratedColumn({ type: "int", name: "library_id", unsigned: true })
  libraryId: number;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @Column("varchar", { name: "location", length: 255 })
  location: string;

  @Column("datetime", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column("datetime", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @Column("datetime", { name: "deleted_at", nullable: true })
  deletedAt: Date | null;

  @OneToMany(() => Reservation, (reservation) => reservation.library)
  reservations: Reservation[];
}
