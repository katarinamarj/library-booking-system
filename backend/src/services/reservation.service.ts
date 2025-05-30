import { AppDataSource } from "../db";
import { Reservation } from "../entities/Reservation";
import { UserService } from "./user.service";
import { IsNull } from "typeorm";

const repo = AppDataSource.getRepository(Reservation);

export class ReservationService {
  static async getReservations(email: string) {
    const userId = await UserService.getUserIdByEmail(email);

    return await repo.find({
      where: {
        userId,
        deletedAt: IsNull()
      },
      relations: {
        user: true,
        library: true
      },
      order: {
        createdAt: "DESC"
      }
    });
  }

  static async createReservation(email: string, model: {
    googleBookId: string,
    bookTitle: string,
    bookAuthor: string,
    libraryId: number
  }) {
    const userId = await UserService.getUserIdByEmail(email);

    await repo.save({
      googleBookId: model.googleBookId,
      bookTitle: model.bookTitle,
      bookAuthor: model.bookAuthor,
      libraryId: model.libraryId,
      userId,
      createdAt: new Date()
    });
  }

  static async deleteReservation(reservationId: number, email: string) {
  const userId = await UserService.getUserIdByEmail(email);

  const reservation = await repo.findOne({
    where: {
      reservationId: reservationId,
      userId,
      deletedAt: IsNull()
    }
  });

  if (!reservation) {
    throw new Error("Reservation not found or already deleted.");
  }

  reservation.deletedAt = new Date();
  await repo.save(reservation);
}

}
