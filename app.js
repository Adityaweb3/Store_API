require('dotenv').config() ;
require('express-async-errors')

const express = require('express')
const app = express()


const connectDB = require('./db/connect')
const notFoundMiddleware = require('./middleware/not-found')
const errorMiddleware = require('./middleware/error-handler')

const productsRouter = require('./routes/products')




app.use(express.json())

app.get('/', (req,res)=>{
    res.send('<h1>Store API</h1>')
})

app.use('/api/v1/products' , productsRouter)

app.use(notFoundMiddleware)
app.use(errorMiddleware)





const port = process.env.PORT || 5000 

const start = async()=>{
    try {

        await connectDB(process.env.MONGO_URI) 

        app.listen(port , console.log(`listening at port  ${port}`))

    }

    catch(error) {

        console.log(error)

    }
}

start()


