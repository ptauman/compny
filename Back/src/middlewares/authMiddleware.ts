//פונקציה גנרית לאימות תוקן של משתמש
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";


//לפני שאממש בפועל אני מגדיר אינטרפייס שיכלול משתמש

export interface AuthRequest extends Request {
    user?: { userIdToken: string, isAdminToken: boolean };
};


//אימות משתמש
export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
    const {employeeId} = req.body

    // ניסיון לחלץ את הטוקן 
    const token = req.header('authorization')?.replace('Bearer ', '');
    //אם אין תוקן תחזיר שגיאה 401
    if (!token) {
        res.status(401).json({ message: `dont have token` });
        return;
    }
    try {
        //ניסיון לאמת את הטוקן
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string, isAdmin: boolean };
        //אם האימות מצליח אני מוסיף את פרטי המשתמש לאובייקט הבקשה
        const isAdminToken = decoded.isAdmin
        const userIdToken = decoded.userId
        req.user = { userIdToken, isAdminToken };
        if (userIdToken !== employeeId) {
            console.log(userIdToken, employeeId)
            res.status(403).json({ message: 'The user information entered does not match the report.' });
            return
        }
        //ממשיך לפונקציה הבאה בשרשרת הטיפול
        next();
    } catch (error) {
        res.status(401).json({ message: 'the token is not valid' });
    }
}
export const isAdminMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
    const token = req.header('authorization')?.replace('Bearer ', '');
    if (!token) {
        res.status(401).json({ message: `dont have token` });
        return;
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string, isAdmin: boolean }
        if (!decoded.isAdmin) {
            res.status(403).json({ message: 'you are not an admin' });
            return   
    } 
    next();
    } catch (error) {
        res.status(401).json({ message: 'the token is not valid' });
    }
}

