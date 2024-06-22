import { db } from "../../../db/connection.js"

export const getHondaToyota = async (req, res, next) => {
    try {
        const models = await db.collection("cars").find(
            { $or: [{ name: "honda" }, { name: "toyota" }] }
        ).toArray()

        if (models.length === 0) {
            return res.status(200).json({ message: 'no honda or toyota cars', success: true })
        }

        return res.status(200).json({ data: models, success: true })
    } catch (err) {
        return res.status(500).json({ message: err.message, success: false })
    }
}


export const getAvailableCarModel = async (req, res, next) => {
    try {
        let { name } = req.params
        const getModel = await db.collection('cars').find(
            {
                name,
                status: 'available'
            }
        ).toArray()
        if (getModel.length === 0) {
            throw Error('car is not available', { cause: 404 })
        }
        res.status(200).json({ data: getModel, success: true })
    } catch (err) {
        return res.status(err.cause || 500).json({ message: err.message, success: false })
    }
}

export const getRentedOrModel = async (req, res, next) => {
    try {
        let { name } = req.params
        const getModel = await db.collection('cars').find(
            {
                $or: [{ status: 'rented' }, { name }]
            }
        ).toArray()
        if (getModel.length === 0) {
            throw Error('car is not available', { cause: 404 })
        }
        res.status(200).json({ data: getModel, success: true })
    } catch (err) {
        return res.status(err.cause || 500).json({ message: err.message, success: false })
    }
}

export const getModelAndStatus = async (req, res, next) => {
    try{
        const {name,status} = req.params
        const getModelStatus = await db.collection('cars').find({
            $or:[{status,name},{status,name}]
        }).toArray()
        if (getModelStatus.length === 0) {
            throw Error('no car with this properties', { cause: 404 })
        }
        res.status(200).json({ data: getModelStatus, success: true })
    }catch(err){
        return res.status(err.cause || 500).json({ message: err.message, success: false })
    }
 }