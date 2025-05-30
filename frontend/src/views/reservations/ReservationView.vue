<script lang="ts" setup>
import Navigation from '@/components/Navigation.vue'
import Loading from '@/components/Loading.vue'
import type { ReservationModel } from '@/models/reservation.model'
import { ReservationService } from '@/services/reservation.service'
import { formatDate } from '@/utils'
import { ref } from 'vue'

const reservations = ref<ReservationModel[] | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

const fetchReservations = async () => {
  loading.value = true
  try {
    const rsp = await ReservationService.getReservations()
    reservations.value = rsp.data
  } catch (err) {
    console.error(err)
    error.value = 'Error loading reservations.'
  } finally {
    loading.value = false
  }
}

fetchReservations()

async function deleteReservation(model: ReservationModel) {
  const confirmDelete = confirm(`Are you sure you want to delete the reservation for "${model.bookTitle}"?`)
  if (!confirmDelete) return

  try {
    await ReservationService.deleteReservation(model.reservationId)
    reservations.value = reservations.value?.filter(r => r.reservationId !== model.reservationId) || []
  } catch (err) {
    console.error(err)
    alert('Error deleting reservation.')
  }
}
</script>


<template>
  <Navigation />
  <div class="container-fluid" style="width: 90%; min-height: 450px;">
    <nav aria-label="breadcrumb" class="mt-3">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <RouterLink to="/">Home</RouterLink>
        </li>
        <li class="breadcrumb-item">
          <RouterLink to="/user">My Account</RouterLink>
        </li>
        <li class="breadcrumb-item active" aria-current="page">
          My Reservations
        </li>
      </ol>
    </nav>
    <h2 class="mb-4" style="color: #36454F !important;">My books reservations</h2>
    <div v-if="error" class="alert alert-danger">{{ error }}</div>
    <table class="table table-hover custom-reservation-table mt-3" v-if="!loading && reservations">
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Author</th>
          <th>Library</th>
          <th>Reserved at</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="r in reservations" :key="r.reservationId">
          <th scope="row">{{ r.reservationId }}</th>
          <td>{{ r.bookTitle }}</td>
          <td>{{ r.bookAuthor }}</td>
          <td>{{ r.library.name }} - {{ r.library.location }}</td>
          <td>{{ formatDate(r.createdAt) }}</td>
          <td>
            <button type="button" class="btn btn-sm btn-danger" title="Delete reservation" @click="deleteReservation(r)">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </td>
        </tr>
        <tr v-if="reservations.length === 0">
          <td colspan="6">You have no reserved books.</td>
        </tr>
      </tbody>
    </table>
    <Loading v-if="loading" />
  </div>
</template>


<style>
.custom-reservation-table th,
.custom-reservation-table td {
  vertical-align: middle;
  font-size: 0.95rem;
  color: #333;
}

.custom-reservation-table thead th {
  background-color: #D3D3D3;
  color: #333;
  font-weight: 600;
  border-bottom: 2px solid #ccc;
}

.custom-reservation-table tr:hover td {
  background-color: #f9f9f9;
}
</style>