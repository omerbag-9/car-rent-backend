import bcrypt from 'bcrypt'
import { db } from '../../../db/connection.js'
import { ObjectId } from 'bson'
// signup
export const signup = async (req, res, next) => {
    // get data from req
    try {
        const { name, email, phone, password } = req.body
        const hashedPassword = bcrypt.hashSync(password, 8)
        // check existance
        const customerExist = await db.collection('customers').findOne({
            $or: [
                { email },
                { phone }
            ]
        })
        if (customerExist) {
            throw Error('user already exists', { cause: 409 })
        }
        // prepare customer
        const customer = {
            name,
            email,
            phone,
            password: hashedPassword
        }
        // add to db
        db.collection('customers').insertOne(customer)
        // send response
        return res.json({ message: 'user added successfully', success: true })
    } catch (err) {
        return res.status(err.cause || 500).json({ message: err.message, success: false })
    }
}

// signin with email or phone
export const signin = async (req, res, next) => {
    try {
        // get data from req
        const { email, phone, password } = req.body
        // check existance
        const customer = await db.collection('customers').findOne({
            $or: [
                { email },
                { phone }
            ]
        })
        if (!customer) {
            throw Error('validation error', { cause: 404 })
        }
        const passwordIsValid = bcrypt.compareSync(password, customer.password)
        if (!passwordIsValid) {
            throw Error('validation error', { cause: 404 })
        }
        return res.status(200).json({ message: "welcome", success: true })
        // send response
    } catch (err) {
        return res.status(err.cause || 500).json({ message: err.message, success: false })
    }
}

// get all customers
export const getCustomers = async (req, res, next) => {
    try {
        const getCustomers = await db.collection('customers').find({projection:{password:0}}).toArray()
        return res.status(200).json({ data: getCustomers, success: true })
    } catch (err) {
        return res.status(500).json({ message: err.message, success: false })
    }
}

// get specific customer
export const getSpecificCustomer = async (req, res, next) => {
    let {id} = req.params
    try{
        id = id.trim()
        const getSpecificCustomer = await db.collection('customers').findOne({_id:new ObjectId(id)},
        {projection:{password:0}}
        )
        console.log(getSpecificCustomer);
        if(getSpecificCustomer === null){
            throw Error('customer is not found',{cause:404})
        }
        res.status(201).json({data:getSpecificCustomer,success:true})
    }catch(err){
        return res.status(err.cause || 500).json({ message: err.message, success: false })
    }
}

// update customer
export const updateCustomer = async (req,res,next) => {
    const {name,email,phone} = req.body
    let {id} = req.params
    try{
        id = id.trim()
        // update user
        const updateUser = await db.collection('customers').updateOne({_id:new ObjectId(id)},
        {$set:{name,email,phone}}
    )
    if(updateUser.matchedCount === 0){
        throw Error('user is not exists',{cause:404})
    }
    if(updateUser.modifiedCount === 0){
        throw Error('cant update the same data',{cause:404})
    }
    return res.status(201).json({message:"user updated successfullt",success:true})
    }catch(err){
        return res.status(err.cause || 500).json({message:err.message,success:false})
    }
}

// delete customer
export const deleteCustomer = async (req,res,next) => {
    let {id} = req.params
    try{
        id = id.trim()
        const deleteCustomer = await db.collection('customers').deleteOne({_id:new ObjectId(id)})
        if(deleteCustomer.deletedCount === 0){
            throw Error('user is not found', {cause:404})
        }
        console.log(deleteCustomer);
        res.status(200).json({message:"user deleted successfully",success:true})
    }catch(err){
        res.status(err.cause || 500).json({message:err.message,success:false})
    }
}