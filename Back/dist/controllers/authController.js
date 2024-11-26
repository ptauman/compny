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
exports.loginEmployee = exports.registerEmployee = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Employee_1 = __importDefault(require("../models/Employee"));
const SECRET_KEY = process.env.JWT_SECRET || "defaultSecret";
// פונקציית הרשמה
const registerEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, isAdmin } = req.body;
    try {
        const existingEmployee = yield Employee_1.default.findOne({ email });
        if (existingEmployee) {
            return res.status(400).json({ message: "User already exists" });
        }
        if (isAdmin) {
            const authHeader = req.headers.authorization;
            if (!authHeader) {
                return res.status(403).json({ message: "Access denied" });
            }
            const token = authHeader.split(" ")[1];
            const decoded = jsonwebtoken_1.default.verify(token, SECRET_KEY);
            if (!decoded.isAdmin) {
                return res.status(403).json({ message: "Only admins can create another admin" });
            }
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const newEmployee = new Employee_1.default({
            name,
            email,
            password: hashedPassword,
            salaryPerHour: 0,
            isAdmin: isAdmin || false,
        });
        yield newEmployee.save();
        return res.status(201).json({ message: "Employee registered successfully", employee: newEmployee });
    }
    catch (error) {
        return res.status(500).json({ message: "Something went wrong", error });
    }
});
exports.registerEmployee = registerEmployee;
// פונקציית כניסה
const loginEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const employee = yield Employee_1.default.findOne({ email });
        if (!employee) {
            return res.status(404).json({ message: "User not found" });
        }
        const isPasswordCorrect = yield bcrypt_1.default.compare(password, employee.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = jsonwebtoken_1.default.sign({ id: employee._id, isAdmin: employee.isAdmin }, SECRET_KEY, {
            expiresIn: "1h",
        });
        return res.status(200).json({ token, isAdmin: employee.isAdmin });
    }
    catch (error) {
        return res.status(500).json({ message: "Something went wrong", error });
    }
});
exports.loginEmployee = loginEmployee;
