import { Request, Response } from "express";
import { createStudent, createTask, adminLoginService } from "../services/admin.service";

export const addStudent = async (req: Request, res: Response) => {
  const { name, email, department, password } = req.body;
  const student = await createStudent(name, email, department, password);
  res.status(201).json({ message: "Student added successfully", student });
};
export const adminlogin = async (req: Request, res: Response) => {
  const {email, password } = req.body;
  const student = await adminLoginService( email, password);
  res.status(201).json({ message: "Student added successfully", student });
};

export const assignTask = async (req: Request, res: Response) => {
  const { studentId, title, description, dueDate } = req.body;
  const task = await createTask(studentId, title, description, new Date(dueDate));
  res.status(201).json({ message: "Task assigned successfully", task });
};
