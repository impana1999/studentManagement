import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
  dueDate: { type: Date, required: true },
  status: { type: String, enum: ["pending", "overdue", "completed"], default: "pending" },
},
{ timestamps: true });

const Task = mongoose.model("Task", taskSchema);
export default Task;
