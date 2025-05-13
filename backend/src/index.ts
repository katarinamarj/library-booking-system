import express, { type Request, type Response } from 'express'
import cors from 'cors'
import { configDotenv } from 'dotenv'
import { AppDataSource } from './db'
import morgan from 'morgan'
import { BookRoute } from './routes/book.route'
import { LibraryRoute } from './routes/library.route'
 
const app = express()
app.use(cors())
app.use(morgan('short'))
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
    res.json({
        message: 'Library booking system'
    })
})

app.use('/api/book', BookRoute);
app.use('/api/library', LibraryRoute);

app.get('{/*path}', function (req, res){
   res.status(404).json({
    message: 'NOT_FOUND',
    timestamp: new Date()
   })
})

configDotenv()
const port = Number(process.env.SERVER_PORT)

AppDataSource.initialize()
    .then(() => {
        console.log('Connected to database.')
        app.listen(3000, () => {
        console.log('Server started at port 3000')
    })
})
.catch((e) => console.log('Database connection failed', e))

