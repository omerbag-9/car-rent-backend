import { Router } from "express";
import { getAvailableCarModel, getHondaToyota, getModelAndStatus, getRentedOrModel } from "./special.controller.js";

const specialRouter = Router()

specialRouter.get("/twoModels",getHondaToyota)
specialRouter.get("/AvailableModel/:name",getAvailableCarModel)
specialRouter.get("/RentedOrModel/:name",getRentedOrModel)
specialRouter.get("/specificAndStatus/:name/:status",getModelAndStatus)
export default specialRouter