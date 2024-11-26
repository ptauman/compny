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
exports.updateEmployee = exports.dimsissEmployee = exports.updateSalary = exports.getEmployeeById = exports.getAllEmployees = void 0;
const Employee_1 = __importDefault(require("../models/Employee"));
const getAllEmployees = () => __awaiter(void 0, void 0, void 0, function* () {
    const employees = yield Employee_1.default.find({ isEmployee: true }).select("__id name");
    return employees;
});
exports.getAllEmployees = getAllEmployees;
const getEmployeeById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const employee = yield Employee_1.default.findById(id).select("-password");
    return employee;
});
exports.getEmployeeById = getEmployeeById;
const updateSalary = (id, salary) => __awaiter(void 0, void 0, void 0, function* () {
    const employee = yield Employee_1.default.findById(id);
    if (!employee) {
        return false;
    }
    employee.global_salary = salary;
    yield employee.save();
    return true;
});
exports.updateSalary = updateSalary;
const dimsissEmployee = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const employee = yield Employee_1.default.findById(id);
    if (!employee) {
        return false;
    }
    employee.isEmployee = false;
    yield employee.save();
    return true;
});
exports.dimsissEmployee = dimsissEmployee;
const updateEmployee = (id, employee) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedEmployee = yield Employee_1.default.findByIdAndUpdate(id, employee, { new: true });
    if (!updatedEmployee) {
        return null;
    }
    return updatedEmployee;
});
exports.updateEmployee = updateEmployee;
