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

    static async getBooksByCategoryAndQuery(category: string, query?: string) {
        let parts: string[] = []

        if (category) {
            parts.push(`subject:${category}`)
        }

        if (query) {
            parts.push(query)
        }

        if (parts.length === 0) {
            parts.push('books')
        }

        const q = parts.join('+')

        const url = `/volumes?q=${encodeURIComponent(q)}&langRestrict=en&maxResults=40`

        return await client.get(url)
    }

    static async searchBooks(search: BookSearchModel) {
       return await client.get(`/volumes?q=subject:${search.category}&langRestrict=en&maxResults=40`)
    }

}
