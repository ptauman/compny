"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEmployee = exports.dismissEmployee = exports.updateSalary = exports.getEmployee = exports.getEmployees = void 0;
const dal = __importStar(require("../dal/managerDal"));
const getEmployees = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const employees = yield dal.getAllEmployees();
    if (!employees) {
        return res.status(204).json({ message: "Employees not found" });
    }
    return res.status(200).json({ message: "Employees fetched successfully", employees });
});
exports.getEmployees = getEmployees;
const getEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const employee = yield dal.getEmployeeById(req.params.id);
    if (!employee) {
        return res.status(204).json({ message: "Employee not found" });
    }
    return res.status(200).json({ message: "Employee fetched successfully", employee });
});
exports.getEmployee = getEmployee;
const updateSalary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, salary } = req.body;
    const update = yield dal.updateSalary(id, salary);
    if (!update) {
        return res.status(204).json({ message: "Employee not found" });
    }
    return res.status(200).json({ message: "Salary updated successfully" });
});
exports.updateSalary = updateSalary;
const dismissEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const dismiss = yield dal.dimsissEmployee(id);
    if (!dismiss) {
        return res.status(204).json({ message: "Employee not found" });
    }
    return res.status(200).json({ message: "Employee dismissed successfully" });
});
exports.dismissEmployee = dismissEmployee;
const updateEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { employee } = req.body;
    const update = yield dal.updateEmployee(id, employee);
    if (!update) {
        return res.status(204).json({ message: "Employee not found" });
    }
    return res.status(201).json({ message: "Employee updated successfully" });
});
exports.updateEmployee = updateEmployee;
