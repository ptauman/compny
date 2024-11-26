import Employee, {Iemployee} from "../models/Employee"
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import * as dal from "../dal/authDal";


declare module 'express' {
   export interface Request {
     user?: {
       userIdToken: string;
       isAdminToken: boolean;
     };
   }
 }
export const register = async (req: Request, res: Response) => {
   const { name, email, password , isAdmin} = req.body;
   if (!name || !email || !password) {

      return res.status(400).json({ message: "Missing required fields" });
   }
   const user = await dal.getUserByEmail(email);
   if (user) {
      return res.status(409).json({ message: "User already exists" });
   }
   if (isAdmin) {
      const token = req.header('authorization')?.replace('Bearer ', '');
      if (!token) {
         return res.status(401).json({ message: `dont have token` });
      }
         const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string, isAdmin: boolean }
         if (!decoded.isAdmin) {
         return res.status(403).json({ message: 'you are not an admin' });
         }
   }
   const newUser = await dal.addeMployee({ name , email, password, isAdmin });
   if (!newUser) {
      return res.status(500).json({ message: "Error creating user" });
   }
   return res.status(201).json({ message: "User created successfully" });
};

export const login = async (req: Request, res: Response) => {
   const { email, password } = req.body;
   if (!email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
   }
  const user = await dal.loginEmployee (email, password);
  if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
   const token = jwt.sign({ userId: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET as string);
   return res.status(200).json({ token, message: "Login successful" ,user});
};
