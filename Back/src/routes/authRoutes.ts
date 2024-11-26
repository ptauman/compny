import { Router } from "express";
import { errorHandler } from "../middlewares/errorHandler";
import { register, login } from "../controllers/authControllerb";

const authRouter = Router();
authRouter.post("/register",errorHandler(register));
authRouter.post ("/login/", errorHandler(login));
export default authRouter;