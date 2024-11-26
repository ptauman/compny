import Employee, {Iemployee} from "../models/Employee"

export const getAllEmployees = async (): Promise<Iemployee[]> => {
    const employees = await Employee.find({isEmployee: true}).select("__id name")
    return employees
}
export const getEmployeeById = async (id: string): Promise<Iemployee|null> => {
    const employee = await Employee.findById(id).select("-password")
    return employee
}
export const updateSalary = async (id: string, salary: number): Promise<boolean|null> => {
    const employee = await Employee.findById(id)
    if (!employee) {
        return false
    }
    employee.global_salary = salary
    await employee.save()
    return true
}
export const dimsissEmployee = async (id: string): Promise<boolean|null> => {
    const employee = await Employee.findById(id)
    if (!employee) {
        return false
    }
    employee.isEmployee = false
    await employee.save()
    return true
}
export const updateEmployee = async (id: string, employee: Partial<Iemployee>): Promise<Iemployee|null> => {
    const updatedEmployee = await Employee.findByIdAndUpdate(id, employee, {new: true})
    if (!updatedEmployee) {
        return null
    }
    return updatedEmployee
}