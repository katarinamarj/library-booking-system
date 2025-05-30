export interface ReservationModel {
  reservationId: number
  bookTitle: string
  bookAuthor: string
  googleBookId: string
  createdAt: string
  library: {
    libraryId: number
    name: string
    location: string
  }
}
