"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdminMiddleware = exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
;
//אימות משתמש
const authMiddleware = (req, res, next) => {
    var _a;
    const { employeeId } = req.body;
    // ניסיון לחלץ את הטוקן 
    const token = (_a = req.header('authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
    //אם אין תוקן תחזיר שגיאה 401
    if (!token) {
        res.status(401).json({ message: `dont have token` });
        return;
    }
    try {
        //ניסיון לאמת את הטוקן
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        //אם האימות מצליח אני מוסיף את פרטי המשתמש לאובייקט הבקשה
        const isAdminToken = decoded.isAdmin;
        const userIdToken = decoded.userId;
        req.user = { userIdToken, isAdminToken };
        if (userIdToken !== employeeId) {
            console.log(userIdToken, employeeId);
            res.status(403).json({ message: 'The user information entered does not match the report.' });
            return;
        }
        //ממשיך לפונקציה הבאה בשרשרת הטיפול
        next();
    }
    catch (error) {
        res.status(401).json({ message: 'the token is not valid' });
    }
};
exports.authMiddleware = authMiddleware;
const isAdminMiddleware = (req, res, next) => {
    var _a;
    const token = (_a = req.header('authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
    if (!token) {
        res.status(401).json({ message: `dont have token` });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        if (!decoded.isAdmin) {
            res.status(403).json({ message: 'you are not an admin' });
            return;
        }
        next();
    }
    catch (error) {
        res.status(401).json({ message: 'the token is not valid' });
    }
};
exports.isAdminMiddleware = isAdminMiddleware;
