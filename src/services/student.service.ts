import bcrypt from "bcryptjs";
import Student from "../models/student.model";
import Task from "../models/task.model";
import { generateToken } from "../utils/jwt";
export const verifyPassword = async (enteredPassword: string, storedPassword: string) => {
  return await bcrypt.compare(enteredPassword, storedPassword);
};

export const findStudentByEmail = async (email: string) => {
  return await Student.findOne({ email });
};

export const findTasksByStudentId = async (studentId: string) => {
  return await Task.find({ studentId });
};

export const updateTaskStatus = async (taskId: string, status: string) => {
  return await Task.findByIdAndUpdate(taskId, { status }, { new: true });
};


export const authenticateStudent = async (email: string, password: string) => {
  const student = await findStudentByEmail(email);
  if (!student || !(await verifyPassword(password, student.password))) {
    throw new Error("Invalid credentials");
  }
  const token = generateToken(student._id.toString());
  return { message: "Student logged in", student,token };
};