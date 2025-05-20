<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { BookService } from '@/services/book.service'
import type { BookModel } from '@/models/book.model'
import Navigation from '@/components/Navigation.vue'

const route = useRoute()
const book = ref<BookModel>()
const bookId = route.params.id as string

BookService.getBookById(bookId)
  .then(rsp => book.value = rsp.data)
  .catch(err => console.error('Failed to fetch book details:', err))
</script>

<template>
  <Navigation />
    <div v-if="book">
      <div class="row mt-3">
        <div class="col-md-3 col-9">
          <img
            :src="book.volumeInfo.imageLinks?.thumbnail"
            :alt="book.volumeInfo.title"
            class="img-fluid book-image"
          />
        </div>
        <div class="col-md-9 mb-3 col-12">
          <table class="table table-striped">
            <tbody>
              <tr>
                <th scope="row">Title:</th>
                <td>{{ book.volumeInfo.title }}</td>
              </tr>
              <tr v-if="book.volumeInfo.publisher">
                <th scope="row">Publisher:</th>
                <td>{{ book.volumeInfo.publisher }}</td>
              </tr>
              <tr v-if="book.volumeInfo.publishedDate">
                <th scope="row">Published date:</th>
                <td>{{ book.volumeInfo.publishedDate }}</td>
              </tr>
              <tr v-if="book.volumeInfo.pageCount">
                <th scope="row">Pages:</th>
                <td>{{ book.volumeInfo.pageCount }} </td>
              </tr>
              <tr v-if="book.volumeInfo.language">
                <th scope="row">Language:</th>
                <td>{{ book.volumeInfo.language }} </td>
              </tr>
              <tr v-if="book.volumeInfo.description">
                <th scope="row">Description:</th>
                <td v-html="book.volumeInfo.description"></td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
  
      <div class="row mt-3">
      <div class="col-12 col-md-6" v-if="book.volumeInfo.categories">
        <h3>Categories:</h3>
        <ul class="list-group">
          <li class="list-group-item" v-for="g in book.volumeInfo.categories" :key="g">{{ g }}</li>
        </ul>
      </div>
      <div class="col-12 col-md-6" v-if="book.volumeInfo.authors">
        <h3>Authors:</h3>
        <ul class="list-group">
          <li class="list-group-item" v-for="a in book.volumeInfo.authors" :key="a">{{ a }}</li>
        </ul>
      </div>
    </div>
  </div>
  
  <div v-else>
    <p>Loading book details...</p>
  </div>
</template>
  
  
<style >
  .book-image {
    transition: transform 0.3s ease;
    width: 250px;
  }
</style>
  