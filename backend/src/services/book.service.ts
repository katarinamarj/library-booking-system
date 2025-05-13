import axios from "axios"

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
    static async searchBooks(query: string, lang: string = 'en', maxResults: number = 40) {
        return await client.get('/volumes', {
            params: {
                q: query,
                langRestrict: lang,
                maxResults
            }
        })
    }
}
