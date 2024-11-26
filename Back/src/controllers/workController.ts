import Employee, {Iemployee} from "../models/Employee"
import { Request, Response } from "express";
import * as dal from "../dal/workDal";



export const clock = async (req: Request, res: Response) => {
    const {reportTime, employeeId } = req.body;
    const employee = await dal.getEmployeeById(employeeId);
    if (!employee) {
      return res.status(500).json({ message: "Employee not found" });
    }
    // if (!employee.isEmployee) {
    //   return res.status(403).json({ message: "You are fired!" });
    // }
    const report = await dal.TimeReport(employeeId, reportTime);
    if (!report) {
      return res.status(409 ).json({ message: "There is a problem with the database. Please contact site security urgently." });
    }
    return res.status(200).json({ message: "Time reported successfully" });
  };
  export const getEmployeeSummary = async (req: Request, res: Response): Promise<void> => {
      const { id } = req.params;
  
      const result = await dal.calculateTotalHoursAndSalary(id);
      if (!result) {
        res.status(404).json({ message: "Employee not found or no data available" });
        return;
      }
      res.status(200).json(result);
    }
  



   