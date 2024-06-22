// import modules
import express from 'express'
import { connectDB } from './db/connection.js'
import customerRouter from './src/modules/customer/customer.router.js'
import carRouter from './src/modules/car/car.router.js'
import rentalRouter from './src/modules/rental/rental.router.js'
import specialRouter from './src/modules/special/special.router.js'

// create server
const app = express()
const port = 3000

// connect to db
connectDB()
app.use(express.json())
app.use('/customers',customerRouter)
app.use('/cars',carRouter)
app.use('/rentals',rentalRouter)
app.use('/special',specialRouter)
// listen server
app.listen(port,()=>{
    console.log('app is running on port',port);
})