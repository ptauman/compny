import Employee, {Iemployee} from "../models/Employee"

export const addeMployee = async (user:Partial< Iemployee>): Promise<Iemployee> => {
    const newUser = new Employee(user)
    const savedUser = await newUser.save()
    return savedUser
}
export const loginEmployee = async (email: string, password: string): Promise<Iemployee|null> => {
    const userToLogin = await getUserByEmail(email)
    if (!userToLogin) {
        return null
    }
    const isPasswordMatch = await userToLogin.comparePassword(password)
    if (!isPasswordMatch) {
        return null
    }
    const userResponse = await Employee.findOne({email}).select("-password")
    return userResponse
}
export const getUserByEmail = async (email: string): Promise<Iemployee|null> => {
    const user = await Employee.findOne({ email })
    if (!user) {
       return null
    }
    return user
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
  