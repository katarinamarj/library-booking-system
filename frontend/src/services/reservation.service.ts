import { useAxios } from '@/utils'

export class ReservationService {
  static async getReservations() {
    return await useAxios('/reservation')
  }

  static async createReservation(model: {
    googleBookId: string
    bookTitle: string
    bookAuthor: string
    libraryId: number
  }) {
    return await useAxios('/reservation', 'post', model)
  }

  static async deleteReservation(reservationId: number) {
    return await useAxios(`/reservation/${reservationId}`, 'delete')
  }
}