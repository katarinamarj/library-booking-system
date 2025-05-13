import axios from "axios";

export class LibraryService {
    static async getLibraries(){
        return await axios.get('http://localhost:3000/api/library')
    }
}