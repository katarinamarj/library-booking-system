import type { LibraryModel } from "@/models/library.model";
import { useAxios } from "@/utils";

export class LibraryService {
    static async getLibraries(){
        return await useAxios('/library')
    }

    static async getLibraryById(id: number) {
        return await useAxios(`/library/${id}`)
    }

    static async createLibrary(model: any) {
        return await useAxios('/library', 'post', model)
    }

    static async updateLibrary(id: number, model: LibraryModel) {
        return await useAxios(`/library/${id}`, 'put', model)
    }

    static async deleteLibraryById(id: number) {
        return await useAxios(`/library/${id}`, 'delete')
    }
}