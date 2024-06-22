import { Router } from "express";
import { addRental, deleteRental, getRental, getSpecificRental, updateRental } from "./rental.controller.js";

const rentalRouter = Router()

// add Rentals
rentalRouter.post('/',addRental)
// get Rentals
rentalRouter.get('/',getRental)
// get specific Rentals
rentalRouter.get('/:id',getSpecificRental)
// update customer
rentalRouter.put('/:id',updateRental)
// delete customer
rentalRouter.delete('/:id',deleteRental)

export default rentalRouter