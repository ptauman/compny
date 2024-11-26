import { Router } from "express";
import { errorHandler, } from "../middlewares/errorHandler";
import { clock, getEmployeeSummary} from "../controllers/workController";
import {authMiddleware} from "../middlewares/authMiddleware";

const workRouter = Router();
workRouter.post("/timeReport", errorHandler(clock));
workRouter.get("/summary/:id", authMiddleware, errorHandler(getEmployeeSummary));
export default workRouter;