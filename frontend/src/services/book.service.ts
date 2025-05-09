import type { BookSearchModel } from "@/models/search.model";
import axios from "axios";

const client = axios.create({
    baseURL: 'https://www.googleapis.com/books/v1',
    headers: {
        'Accept': 'application/json'
    },
    validateStatus: (status: number) => {
        return status === 200
    }
})


export class BookService {
    static async getBooks() {
        return await client.get(
          '/volumes?q=search+term&langRestrict=en&maxResults=40'
    )
    }

    static async getBookById(id: string) {
        return await client.get(`/volumes/${id}`)
    }

    static async getBooksByCategory(category: string) {
       return await client.get(`/volumes?q=subject:${category}&langRestrict=en&maxResults=40`)
    }

    static async searchBooks(search: BookSearchModel) {
       return await client.get(`/volumes?q=subject:${search.category}&langRestrict=en&maxResults=40`)
    }

}
