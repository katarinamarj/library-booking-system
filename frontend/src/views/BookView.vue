<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { BookService } from '@/services/book.service'
import type { BookModel } from '@/models/book.model'
import Navigation from '@/components/Navigation.vue'
import Loading from '@/components/Loading.vue'

const route = useRoute()
const book = ref<BookModel>()
const bookId = route.params.id as string

BookService.getBookById(bookId)
  .then(rsp => book.value = rsp.data)
  .catch(err => console.error('Failed to fetch book details:', err))
</script>

<template>
  <Navigation />
  <div v-if="book" class="container-fluid" style="width: 90%;">
    <div class="row mt-3">
      <div class="col-12 mb-4 mt-3 d-flex justify-content-between align-items-center">
        <h3 class="text-primary fw-bold mb-0" style="color: #36454F !important;">
          {{ book.volumeInfo.title }}
        </h3>
        <router-link
          :to="{ name: 'book-reservation', params: { id: bookId } }"
          class="btn" style="background-color: #7393B3; color: white;"
        >
          <i class="fa-solid fa-book"></i>  Reserve Book
        </router-link>
      </div>

      <div class="col-md-3 col-9">
        <img
          :src="book.volumeInfo.imageLinks?.thumbnail"
          :alt="book.volumeInfo.title"
          class="img-fluid book-image"
        />
      </div>

      <div class="col-md-9 mb-3 col-12">
        <table class="table table-striped align-middle shadow-sm rounded">
          <tbody>
            <tr v-if="book.volumeInfo.categories">
              <th scope="row" style="width: 25%;">Categories:</th>
              <td>
                <ul class="mb-0 ps-3">
                  <li v-for="cat in book.volumeInfo.categories" :key="cat">{{ cat }}</li>
                </ul>
              </td>
            </tr>
            <tr v-if="book.volumeInfo.authors">
              <th scope="row">Authors:</th>
              <td>
                <ul class="mb-0 ps-3">
                  <li v-for="author in book.volumeInfo.authors" :key="author">{{ author }}</li>
                </ul>
              </td>
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
              <td>{{ book.volumeInfo.pageCount }}</td>
            </tr>
            <tr v-if="book.volumeInfo.language">
              <th scope="row">Language:</th>
              <td>{{ book.volumeInfo.language }}</td>
            </tr>
            <tr v-if="book.volumeInfo.description">
              <th scope="row">Description:</th>
              <td v-html="book.volumeInfo.description"></td>
            </tr>
          </tbody>
        </table>
    </div>
  </div>
  </div>
  <Loading v-else />
</template>
  

<style >
  .book-image {
    transition: transform 0.3s ease;
    width: 250px;
  }

  .breadcrumb a {
    color: #7393B3; 
  }
</style>
  