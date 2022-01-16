import express from 'express'
import cors from 'cors'
import Route from './routes/index.js'

const app = express()

// init middleware
app.use(cors())

// define routes
app.use('/api', Route)

// define server
const PORT = process.env.PORT || 4000
app.listen(PORT, function() {
    console.log(`Server listening on: http://localhost:${PORT}`);
});
