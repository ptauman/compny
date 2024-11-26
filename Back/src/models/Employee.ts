import mongoose, { Schema, Document, Types } from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export interface Day{
  entryTime: Date;
  exitTime?: Date;
  salary: number
  }

export interface Iemployee extends Partial<Document> {
  name: string;
  email: string;
  password: string;
  isAdmin?: boolean;
  days: Day[]
  isEmployee?: boolean;
  isActive?: boolean;
  Joining_date: Date;
  global_salary: number
  comparePassword(userPassword: string): Promise<boolean>;
}

const employeeSchema = new Schema<Iemployee>({
  name: { type: String, required: true},
  email: { type: String, required: true, unique: true, validate: [validator.isEmail, "Invalid email format"]},
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  isEmployee: { type: Boolean, default: true },
  isActive: { type: Boolean, default: false },
  global_salary: { type: Number, default: 0 },
  days: [],
  Joining_date: { type: Date, default: Date.now }
  });
  employeeSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
})

employeeSchema.methods.comparePassword = async function (userPassword: string) : Promise<boolean> {
  return await bcrypt.compare(userPassword, this.password);
};
export default mongoose.model<Iemployee>("Employee", employeeSchema);
