import { Router, type Request, type Response } from "express";
import { BookService } from "../services/book.service";
import { defineRequest } from "../utils";

export const BookRoute = Router();

// GET /api/books/search?q=some+term
BookRoute.get('/search', async (req: Request, res: Response) => {
    await defineRequest(res, async () => {
        const q = req.query.q as string;
        if (!q) {
            return res.status(400).json({ error: 'Missing search query "q"' });
        }

        const lang = (req.query.lang as string) || 'en';
        const maxResults = Number(req.query.maxResults) || 40;

        const rsp = await BookService.searchBooks(q, lang, maxResults);
        res.json(rsp.data);
    });
});
