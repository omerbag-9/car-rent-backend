import { ObjectId } from "bson"
import { db } from "../../../db/connection.js"

// add rentals and set car status to rented
export const addRental = async (req, res, next) => {
    // get data from req
    try {
        const { customerId, carId, rentalDate, returnDate } = req.body
        // check car existance and availablilty
        const carExist = await db.collection('cars').findOne({ _id: new ObjectId(carId), status: "available" })
        if (!carExist) {
            throw Error('car is not available', { cause: 404 })
        }

        // update car status
        await db.collection("cars").updateOne(
            { _id: new ObjectId(carId) },
            { $set: { status: "rented" } }
        )

        // prepare car
        const rental = {
            customerId,
            carId,
            rentalDate,
            returnDate

        }
        // add to db
        await db.collection('rentals').insertOne(rental);
        // send response
        return res.json({ message: 'car added successfully to the rentals', success: true })
    } catch (err) {
        return res.status(err.cause || 500).json({ message: err.message, success: false })
    }
}



// get all rentals
export const getRental = async (req, res, next) => {
    try {
        const getRental = await db.collection('rentals').find().toArray()
        return res.status(200).json({ data: getRental, success: true })
    } catch (err) {
        return res.status(500).json({ message: err.message, success: false })
    }
}


// get specific Rental
export const getSpecificRental = async (req, res, next) => {
    let { id } = req.params
    try {
        id = id.trim()
        const getSpecificRental = await db.collection('rentals').findOne({ _id: new ObjectId(id) })
        console.log(getSpecificRental);
        if (getSpecificRental === null) {
            throw Error('Rental is not found', { cause: 404 })
        }
        res.status(201).json({ data: getSpecificRental, success: true })
    } catch (err) {
        return res.status(err.cause || 500).json({ message: err.message, success: false })
    }
}


// update Rental
export const updateRental = async (req, res, next) => {
    const { customerId, carId, rentalDate, returnDate } = req.body
    let { id } = req.params
    try {
        id = id.trim()
        // update user
        const updateRental = await db.collection('rentals').updateOne({ _id: new ObjectId(id) },
            { $set: { customerId, carId, rentalDate, returnDate } }
        )
        if (updateRental.matchedCount === 0) {
            throw Error('Rental is not exists', { cause: 404 })
        }
        if (updateRental.modifiedCount === 0) {
            throw Error('cant update the same data', { cause: 404 })
        }
        return res.status(201).json({ message: "Rental updated successfullt", success: true })
    } catch (err) {
        return res.status(err.cause || 500).json({ message: err.message, success: false })
    }
}



// delete Rental and set the car status to available
export const deleteRental = async (req, res, next) => {
    let { id } = req.params
    try {
        id = id.trim()
        
           // get carId
           const rental = await db.collection('rentals').findOne({ _id: new ObjectId(id) });
           if (!rental) {
               throw new Error('Rental is not found', { cause: 404 });
           }
   
           const { carId } = rental;
   
           // Update car status to available
           await db.collection('cars').updateOne(
               { _id: new ObjectId(carId) },
               { $set: { status: 'available' } }
           );

        const deleteRental = await db.collection('rentals').deleteOne({ _id: new ObjectId(id) })
        if (deleteRental.deletedCount === 0) {
            throw Error('Rental is not found', { cause: 404 })
        }
        console.log(deleteRental);
        res.status(200).json({ message: "Rental deleted successfully", success: true })
    } catch (err) {
        res.status(err.cause || 500).json({ message: err.message, success: false })
    }
}