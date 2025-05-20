<script lang="ts" setup>
import axios from 'axios';
import { ref } from 'vue';
import type { BookSearchResponse, BookModel } from '@/models/book.model';
import Navigation from '@/components/Navigation.vue';

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
  <div v-if="books.length > 0">
    <h2>Book Search Results</h2>
    <ul>
      <li v-for="book in books" :key="book.id" style="margin-bottom: 2rem">
        <img :src="getCoverUrl(book)" :alt="book.volumeInfo.title" width="200" />
        <h3>{{ book.volumeInfo.title }}</h3>
        <p>Author: {{ book.volumeInfo.authors?.join(', ') || 'Unknown' }}</p>
        <p>Published: {{ book.volumeInfo.publishedDate || 'Unknown' }}</p>
        <p>Publisher: {{ book.volumeInfo.publisher || 'Unknown' }}</p>
        <p>Language: {{ book.volumeInfo.language || 'Unknown' }}</p>
        <p>Categories: {{ book.volumeInfo.categories?.join(', ') || 'None' }}</p>
        <p v-if="book.volumeInfo.pageCount">Pages: {{ book.volumeInfo.pageCount }}</p>
        <p v-if="book.volumeInfo.description"> Description: {{ book.volumeInfo.description }}</p>
      </li>
    </ul>
  </div>

  <div v-else>
    <p>Loading data...</p>
  </div>
</template>
