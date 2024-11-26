import { isSameDay } from 'date-fns';
import Employee, {Iemployee, Day } from "../models/Employee";

export const TimeReport = async (id: string, date: Date): Promise<Day[] | null> => {
    const employee = await Employee.findById(id).select("days global_salary isActive");
    if (!employee) return null;

    if (!employee.days || employee.days.length === 0 || employee.days.every(day => day.entryTime && day.exitTime)) {
        const updatedEmployee = await Employee.findByIdAndUpdate(
            id,
            {
                $push: { days: { entryTime: date, salary: employee.global_salary } },
                isActive: true,
            },
            { new: true, select: "days" }
        );
        return updatedEmployee?.days || null;
    }

    const lastDay = employee.days[employee.days.length - 1];
    if (!lastDay || !isSameDay(lastDay.entryTime, date)) {
        return null;
    }

    const updatedEmployee = await Employee.findOneAndUpdate(
        { _id: id, "days.entryTime": lastDay.entryTime, "days.exitTime": null },
        {
            $set: { "days.$.exitTime": date, isActive: false },
        },
        { new: true, select: "days" }
    );
    return updatedEmployee?.days || null;
};
export const getEmployeeById = async (id: string): Promise<Iemployee|null> => {
    const employee = await Employee.findById(id).select("-password")
    return employee
}
export const calculateTotalHoursAndSalary = async (employeeId: string): Promise<{ totalHours: number; totalSalary: number } | null> => {
    try {
      const employee: Iemployee | null = await Employee.findById(employeeId);
      if (!employee) {
        throw new Error("Employee not found");
      }
        let totalHours = 0;
      let totalSalary = 0;
  
      for (const day of employee.days) {
        if (day.entryTime && day.exitTime) {
          const entryTime = new Date(day.entryTime);
          const exitTime = new Date(day.exitTime);
            const hoursWorked = (exitTime.getTime() - entryTime.getTime()) / (1000 * 60 * 60);
          totalHours += hoursWorked;
            totalSalary += day.salary;
        }
      }
  
      return { totalHours, totalSalary };
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  