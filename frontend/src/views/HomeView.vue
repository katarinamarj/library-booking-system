<script setup lang="ts">
import { ref } from 'vue'
import { BookService } from '@/services/book.service'
import type { BookModel } from '@/models/book.model'
import type { BookSearchModel } from '@/models/search.model'
import { bookCategories } from '@/data/categories'
import Navigation from '@/components/Navigation.vue'
import Loading from '@/components/Loading.vue'

const books = ref<BookModel[]>([])
const search = ref<BookSearchModel>({ category: '' })

function loadBooks() {
BookService.getBooksByCategory(search.value.category)
    .then(rsp => books.value = rsp.data.items || [])
}

loadBooks()
</script>

<template>
  <Navigation />
  <div class="mb-3 mt-3">
    <select class="form-select" v-model="search.category" @change="loadBooks">
      <option value="">Choose category:</option>
      <option v-for="c in bookCategories" :key="c" :value="c.toLowerCase()"> {{ c }} </option>
    </select>
  </div>

  <div class="card-holder" v-if="books.length">
    <div class="card book-card" v-for="b in books" :key="b.id">
      <img
        :src="b.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/150'"
        class="card-img-top"
        :alt="b.volumeInfo.title"
      />
      <div class="card-body">
        <h5 class="card-title">{{ b.volumeInfo.title }}</h5>
        <p class="card-text">
          {{ b.volumeInfo.description?.slice(0, 100) || 'No description available.' }}
        </p>
      </div>
      <div class="card-footer">
        <RouterLink :to="`/book/${b.id}`" class="btn btn-sm btn-outline-primary">
          <i class="fa-solid fa-eye"></i> Details
        </RouterLink>
      </div>
    </div>
  </div>
  <Loading v-else />
</template>

<style>
  .card-holder {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
  }
  .book-card {
    width: 18rem;
    min-height: 200px;
  }

  .card-img-top {
    height: 320px; 
    object-fit: cover; 
    width: 100%; 
  }
</style>
