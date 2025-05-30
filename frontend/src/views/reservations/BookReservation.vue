<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { LibraryService } from '@/services/library.service'
import { BookService } from '@/services/book.service'
import { ReservationService } from '@/services/reservation.service'
import type { LibraryModel } from '@/models/library.model'
import Navigation from '@/components/Navigation.vue'

const route = useRoute()
const router = useRouter()
const bookId = route.params.id as string

const bookTitle = ref<string>('')
const bookAuthor = ref<string>('') 
const selectedLibraryId = ref<number | null>(null)
const libraries = ref<LibraryModel[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

onMounted(async () => {
  try {
    const bookRsp = await BookService.getBookById(bookId)
    const info = bookRsp.data.volumeInfo
    bookTitle.value = info.title
    bookAuthor.value = info.authors?.join(', ') ?? 'Unknown'

    const libRsp = await LibraryService.getLibraries()
    libraries.value = libRsp.data
  } catch (err) {
    console.error(err)
    error.value = 'You must be logged in to make a reservation.'
  }
})

const confirmReservation = async () => {
  if (!selectedLibraryId.value) return

  loading.value = true
  try {
    await ReservationService.createReservation({
      googleBookId: bookId,
      bookTitle: bookTitle.value,
      bookAuthor: bookAuthor.value,
      libraryId: selectedLibraryId.value,
    })
    router.push('/reservations') 
  } catch (err) {
    console.error(err)
    error.value = 'Failed to reserve the book.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <Navigation />
  <div class="container-fluid" style="width: 70%; margin-bottom: 100px; margin-top: 70px;">
    <div class="row align-items-start">
      <div class="col-md-8 order-md-1">
        <h2 class="mb-3" style="color: #36454F !important;"><strong>{{ bookTitle }}</strong></h2>
        <p class="text-muted" style="font-size: 20px;">Author: {{ bookAuthor }}</p>
        <div class="mb-4 mt-5">
          <label for="library" class="form-label">Choose a library:</label>
          <select v-model="selectedLibraryId" class="form-select" id="library"  style="width: auto; ">
            <option disabled value="">Select library</option>
            <option
              v-for="library in libraries"
              :key="library.libraryId"
              :value="library.libraryId"
            >
              {{ library.location }} - {{ library.name }}
            </option>
          </select>
        </div>
        <button
          class="btn mt-3 mb-5"
          style="background-color: #7393B3; color: white;"
          :disabled="!selectedLibraryId || loading"
          @click="confirmReservation"
        >
          {{ loading ? 'Reserving...' : 'Confirm Reservation' }}
        </button>
        <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
      </div>
      <div class="col-md-4 order-md-2 text-center">
        <img
          v-if="bookId"
          :src="`https://books.google.com/books/content?id=${bookId}&printsec=frontcover&img=1&zoom=1&source=gbs_api`"
          alt="Book Cover"
          class="img-fluid rounded shadow"
          style="height: 300px; object-fit: contain;"
        />
      </div>
    </div>
  </div>
</template>
