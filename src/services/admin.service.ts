import bcrypt from "bcryptjs";
import Student from "../models/student.model"
import Task from "../models/task.model";
import { generateToken } from "../utils/jwt";

export const adminLoginService = (email: string, password: string) => {
  if (email === "admin@admin.com" && password === "admin") {
    const token = generateToken("admin");
    return { message: "Admin logged in", token };
  }
  return null;
};

export const createStudent = async (name: string, email: string, department: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const student = new Student({ name, email, department, password: hashedPassword });
  await student.save();
  return student;
};

export const createTask = async (studentId: string, title: string, description: string, dueDate: Date) => {
  const task = new Task({ studentId, title, description, dueDate });
  await task.save();
  return task;
};
