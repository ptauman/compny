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
exports.calculateTotalHoursAndSalary = exports.getEmployeeById = exports.TimeReport = void 0;
const date_fns_1 = require("date-fns");
const Employee_1 = __importDefault(require("../models/Employee"));
const TimeReport = (id, date) => __awaiter(void 0, void 0, void 0, function* () {
    const employee = yield Employee_1.default.findById(id).select("days global_salary isActive");
    if (!employee)
        return null;
    if (!employee.days || employee.days.length === 0 || employee.days.every(day => day.entryTime && day.exitTime)) {
        const updatedEmployee = yield Employee_1.default.findByIdAndUpdate(id, {
            $push: { days: { entryTime: date, salary: employee.global_salary } },
            isActive: true,
        }, { new: true, select: "days" });
        return (updatedEmployee === null || updatedEmployee === void 0 ? void 0 : updatedEmployee.days) || null;
    }
    const lastDay = employee.days[employee.days.length - 1];
    if (!lastDay || !(0, date_fns_1.isSameDay)(lastDay.entryTime, date)) {
        return null;
    }
    const updatedEmployee = yield Employee_1.default.findOneAndUpdate({ _id: id, "days.entryTime": lastDay.entryTime, "days.exitTime": null }, {
        $set: { "days.$.exitTime": date, isActive: false },
    }, { new: true, select: "days" });
    return (updatedEmployee === null || updatedEmployee === void 0 ? void 0 : updatedEmployee.days) || null;
});
exports.TimeReport = TimeReport;
const getEmployeeById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const employee = yield Employee_1.default.findById(id).select("-password");
    return employee;
});
exports.getEmployeeById = getEmployeeById;
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
