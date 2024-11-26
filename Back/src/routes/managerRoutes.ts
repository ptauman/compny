import { Router } from "express";
import { errorHandler } from "../middlewares/errorHandler";
import * as con  from "../controllers/managerController";
import { isAdminMiddleware } from "../middlewares/authMiddleware";

const managerRouter = Router();
managerRouter.get("/employees", isAdminMiddleware, errorHandler(con.getEmployees));
managerRouter.get("/employees/:id", isAdminMiddleware, errorHandler(con.getEmployee));
managerRouter.post("/employees/:id", isAdminMiddleware, errorHandler(con.updateSalary));
managerRouter.put("/employees/salary/:id", isAdminMiddleware, errorHandler(con.updateSalary));
managerRouter.delete("/employees/:id", isAdminMiddleware, errorHandler(con.dismissEmployee));
export default managerRouter;