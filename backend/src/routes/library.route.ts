import { Router } from "express";
import { defineRequest } from "../utils";
import { LibraryService } from "../services/library.service";

export const LibraryRoute = Router();

LibraryRoute.get('/', async(require, res) => {
    await defineRequest(res, async() => 
       await LibraryService.getLibraries()
    )
})

LibraryRoute.get('/:id', async (req, res) => {
    await defineRequest(res, async() => {
        const id = Number(req.params.id)
        return await LibraryService.getLibraryById(id)
    })
})
 
LibraryRoute.post('/',async (req, res) => {
    await defineRequest(res, async() =>
        LibraryService.createLibrary(req.body)
    )
})

LibraryRoute.put('/:id', async (req, res) => {
    await defineRequest(res, async() => {
        const id = Number(req.params.id)
        await LibraryService.updateLibrary(id, req.body)
    })
})

LibraryRoute.delete('/:id', async (req, res) => {
    await defineRequest(res, async() => {
        const id = Number(req.params.id)
        await LibraryService.deleteLibrary(id)
    })
})