"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateTotalHoursAndSalary = exports.getUserByEmail = exports.loginEmployee = exports.addeMployee = void 0;
const Employee_1 = __importDefault(require("../models/Employee"));
const addeMployee = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = new Employee_1.default(user);
    const savedUser = yield newUser.save();
    return savedUser;
});
exports.addeMployee = addeMployee;
const loginEmployee = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const userToLogin = yield (0, exports.getUserByEmail)(email);
    if (!userToLogin) {
        return null;
    }
    const isPasswordMatch = yield userToLogin.comparePassword(password);
    if (!isPasswordMatch) {
        return null;
    }
    const userResponse = yield Employee_1.default.findOne({ email }).select("-password");
    return userResponse;
});
exports.loginEmployee = loginEmployee;
const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield Employee_1.default.findOne({ email });
    if (!user) {
        return null;
    }
    return user;
});
exports.getUserByEmail = getUserByEmail;
const calculateTotalHoursAndSalary = (employeeId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const employee = yield Employee_1.default.findById(employeeId);
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
    }
    catch (error) {
        console.error(error);
        return null;
    }
});
exports.calculateTotalHoursAndSalary = calculateTotalHoursAndSalary;
