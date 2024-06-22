import { Router } from "express";
import { deleteCustomer, getCustomers, getSpecificCustomer, signin, signup, updateCustomer } from "./customer.controller.js";

const customerRouter = Router()

// signUp
customerRouter.post('/signup',signup)
// signin
customerRouter.post('/signin',signin)
// get customers
customerRouter.get('/',getCustomers)
// get specific customer
customerRouter.get('/:id',getSpecificCustomer)
// update customer
customerRouter.put('/:id',updateCustomer)
// delete customer
customerRouter.delete('/:id',deleteCustomer)


export default customerRouter