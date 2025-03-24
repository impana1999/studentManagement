import express from "express";
import { studentLogin, getTasks, updateTaskStatusController } from "../controllers/student.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = express.Router();

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Student login
 *     description: Authenticates a student and returns a JWT token.
 *     tags:
 *       - Students
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: "student@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Successfully authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Unauthorized - Invalid credentials
 */
router.post("/login", studentLogin);

/**
 * @swagger
 * /tasks:
 *   put:
 *     summary: Update task status
 *     description: Allows a student to update the status of an assigned task.
 *     tags:
 *       - Students
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - taskId
 *               - status
 *             properties:
 *               taskId:
 *                 type: string
 *                 example: "605c72b3e3b2e827d8b14b32"
 *               status:
 *                 type: string
 *                 enum: [ "pending", "in-progress", "completed" ]
 *                 example: "completed"
 *     responses:
 *       200:
 *         description: Task status updated successfully
 *       400:
 *         description: Bad request - Invalid input
 */
router.put("/tasks", authMiddleware, updateTaskStatusController);

/**
 * @swagger
 * /getTasks/{id}:
 *   post:
 *     summary: Get tasks for a student
 *     description: Fetches all tasks assigned to a student.
 *     tags:
 *       - Students
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "605c72b3e3b2e827d8b14b32"
 *         description: Student ID to retrieve tasks
 *     responses:
 *       200:
 *         description: Successfully retrieved tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   taskId:
 *                     type: string
 *                     example: "task123"
 *                   taskTitle:
 *                     type: string
 *                     example: "Complete Assignment"
 *                   taskDescription:
 *                     type: string
 *                     example: "Submit before deadline"
 *                   status:
 *                     type: string
 *                     example: "in-progress"
 *       404:
 *         description: Student not found or no tasks assigned
 */
router.post("/getTasks/:id", authMiddleware, getTasks);

export default router;
