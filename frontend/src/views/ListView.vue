<script lang="ts" setup>
import axios from 'axios';
import { ref } from 'vue';
import type { BookSearchResponse, BookModel } from '@/models/book.model';
import Navigation from '@/components/Navigation.vue';
import Loading from '@/components/Loading.vue';

const books = ref<BookModel[]>([]);

axios
  .get<BookSearchResponse>('https://www.googleapis.com/books/v1/volumes?q=search+term&langRestrict=en&maxResults=40')
  .then(response => {
    books.value = response.data.items || [];
  })
  .catch(error => {
    console.error('Error loading book data:', error);
  });

function getCoverUrl(book: BookModel): string {
  return book.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/200x300?text=No+Cover';
}
</script>

<template>
  <Navigation />
  <div class="container mt-4">
    <h2 class="mb-4 text-center" style="color: #36454F;">Books List</h2>

    <div v-if="books.length > 0" class="row g-4">
      <div
        v-for="book in books"
        :key="book.id"
        class="col-12 col-sm-6 col-md-4 col-lg-3 d-flex align-items-stretch"
      >
        <div class="card h-100 shadow-sm">
          <img
            :src="getCoverUrl(book)"
            class="card-img-top"
            :alt="book.volumeInfo.title"
            style="height: 300px; object-fit: cover;"
          />
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">{{ book.volumeInfo.title }}</h5>
            <p class="card-text mb-1"><strong>Author:</strong> {{ book.volumeInfo.authors?.join(', ') || 'Unknown' }}</p>
            <p class="card-text mb-1"><strong>Published:</strong> {{ book.volumeInfo.publishedDate || 'Unknown' }}</p>
            <p class="card-text mb-1"><strong>Publisher:</strong> {{ book.volumeInfo.publisher || 'Unknown' }}</p>
            <p class="card-text mb-1"><strong>Language:</strong> {{ book.volumeInfo.language || 'Unknown' }}</p>
            <p class="card-text mb-1"><strong>Categories:</strong> {{ book.volumeInfo.categories?.join(', ') || 'None' }}</p>
            <p class="card-text" v-if="book.volumeInfo.pageCount">
              <strong>Pages:</strong> {{ book.volumeInfo.pageCount }}
            </p>
            <p class="card-text mt-auto" v-if="book.volumeInfo.description">
              <small>{{ book.volumeInfo.description.slice(0, 100) }}...</small>
            </p>
          </div>
        </div>
      </div>
    </div>
    <Loading v-else />
  </div>
</template>

<style>
.card-title {
  font-size: 1rem;
  font-weight: bold;
  color: #36454F;
}

.card-text {
  font-size: 0.85rem;
}
</style>