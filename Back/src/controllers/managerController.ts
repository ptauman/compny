import* as dal from "../dal/managerDal";
import Employee, {Iemployee} from "../models/Employee"
import { Request, Response } from "express";

export const getEmployees = async (req: Request, res: Response) => {
        const employees = await dal.getAllEmployees()
        if (!employees) {
            return res.status(204).json({ message: "Employees not found" })
        }
        return res.status(200).json({ message: "Employees fetched successfully", employees });
};
export const getEmployee = async (req: Request, res: Response) => {
        const employee = await dal.getEmployeeById(req.params.id)
        if (!employee) {
            return res.status(204).json({ message: "Employee not found" });
        }
        return res.status(200).json({ message: "Employee fetched successfully", employee });
}
export const updateSalary = async (req: Request, res: Response) => {
    const { id, salary } = req.body;
    const update = await dal.updateSalary(id, salary);
    if (!update) {
        return res.status(204).json({ message: "Employee not found" });
    }
    return res.status(200).json({ message: "Salary updated successfully" })
}
export const dismissEmployee = async (req: Request, res: Response) => {
    const { id } = req.params;
    
    const dismiss = await dal.dimsissEmployee(id);
    if (!dismiss) {
        return res.status(204).json({ message: "Employee not found" });
    }
    return res.status(200).json({ message: "Employee dismissed successfully" })
}
export const updateEmployee = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { employee } = req.body; 
    const update = await dal.updateEmployee(id, employee);
    if (!update) {
        return res.status(204).json({ message: "Employee not found" });
    }
    return res.status(201).json({ message: "Employee updated successfully" })
}
