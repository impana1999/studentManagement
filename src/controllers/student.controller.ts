import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt";
import { findTasksByStudentId, updateTaskStatus, authenticateStudent } from "../services/student.service";
import { AuthRequest } from "../types/express"; 

export const studentLogin = async (req: Request, res: Response) => {

    const { email, password } = req.body;
    const result = await authenticateStudent(email, password);
    res.json(result);
 
};

export const getTasks = async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    throw new Error("Unauthorized: No user found");
  }
  
  const tasks = await findTasksByStudentId(req.params.id);
  res.json(tasks);
};


export const updateTaskStatusController = async (req: Request, res: Response) => {
  const { taskId, status } = req.body;
  const task = await updateTaskStatus(taskId, status);
  res.json({ message: "Task status updated", task });
};
