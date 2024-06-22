import { ObjectId } from "bson"
import { db } from "../../../db/connection.js"

// add Car
export const addCar = async (req, res, next) => {
    // get data from req
    try {
        const { name, model, status} = req.body
        // prepare car
        const car = {
            name,
            model,
            status
        }
        // add to db
          db.collection('cars').insertOne(car)
        // send response
        return res.json({ message: 'car added successfully', success: true })
    } catch (err) {
        return res.status(500).json({ message: err.message, success: false })
    }
}



// get all cars
export const getCars = async (req, res, next) => {
    try {
        const getCars = await db.collection('cars').find().toArray()
        return res.status(200).json({ data: getCars, success: true })
    } catch (err) {
        return res.status(500).json({ message: err.message, success: false })
    }
}



// get specific car
export const getSpecificCar = async (req, res, next) => {
    let {id} = req.params
    try{
        id = id.trim()
        const getSpecificCar = await db.collection('cars').findOne({_id:new ObjectId(id)})
        console.log(getSpecificCar);
        if(getSpecificCar === null){
            throw Error('car is not found',{cause:404})
        }
        res.status(201).json({data:getSpecificCar,success:true})
    }catch(err){
        return res.status(err.cause || 500).json({ message: err.message, success: false })
    }
}


// update car
export const updateCar = async (req,res,next) => {
    const {name,model,status} = req.body
    let {id} = req.params
    try{
        id = id.trim()
        // update user
        const updateCar = await db.collection('cars').updateOne({_id:new ObjectId(id)},
        {$set:{name,model,status}}
    )
    if(updateCar.matchedCount === 0){
        throw Error('car is not exists',{cause:404})
    }
    if(updateCar.modifiedCount === 0){
        throw Error('cant update the same data',{cause:404})
    }
    return res.status(201).json({message:"car updated successfullt",success:true})
    }catch(err){
        return res.status(err.cause || 500).json({message:err.message,success:false})
    }
}

// delete car
export const deleteCar = async (req,res,next) => {
    let {id} = req.params
    try{
        id = id.trim()
        const deleteCar = await db.collection('cars').deleteOne({_id:new ObjectId(id)})
        if(deleteCar.deletedCount === 0){
            throw Error('car is not found', {cause:404})
        }
        console.log(deleteCar);
        res.status(200).json({message:"car deleted successfully",success:true})
    }catch(err){
        res.status(err.cause || 500).json({message:err.message,success:false})
    }
}