import { Router } from "express";
import { addCar, deleteCar, getCars, getSpecificCar, updateCar } from "./car.controller.js";

const carRouter = Router()

// add car
carRouter.post('/',addCar)
// get cars
carRouter.get('/',getCars)
// get specific car
carRouter.get('/:id',getSpecificCar)
// update customer
carRouter.put('/:id',updateCar)
// delete customer
carRouter.delete('/:id',deleteCar)


export default carRouter