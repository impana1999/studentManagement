import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { addStudent, assignTask, adminlogin } from "../controllers/admin.controller";

const router = express.Router();

/**
 * @swagger
 * /adminlogin:
 *   post:
 *     summary: Admin login
 *     description: Authenticates the admin and returns a JWT token.
 *     tags:
 *       - Admin
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
 *                 example: "admin@admin.com"
 *               password:
 *                 type: string
 *                 example: "admin123"
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
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI..."
 *       401:
 *         description: Unauthorized - Invalid credentials
 *       500:
 *         description: Internal server error
 */
router.post("/adminlogin", adminlogin);

/**
 * @swagger
 * /students:
 *   post:
 *     summary: Add a new student
 *     description: Creates a new student record in the system.
 *     tags:
 *       - Admin
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - department
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 example: "johndoe@example.com"
 *               department:
 *                 type: string
 *                 example: "Computer Science"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       201:
 *         description: Student created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "65c8f07e2a5a3e001f9c1e74"
 *                 name:
 *                   type: string
 *                   example: "John Doe"
 *                 email:
 *                   type: string
 *                   example: "johndoe@example.com"
 *                 department:
 *                   type: string
 *                   example: "Computer Science"
 *       400:
 *         description: Bad request - Invalid input
 *       500:
 *         description: Internal server error
 */
router.post("/students", authMiddleware, addStudent);

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Assign a task to a student
 *     description: Assigns a new task to a student by the admin.
 *     tags:
 *       - Admin
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - studentId
 *               - title
 *               - description
 *               - dueDate
 *             properties:
 *               studentId:
 *                 type: string
 *                 example: "605c72b3e3b2e827d8b14b32"
 *               title:
 *                 type: string
 *                 example: "Complete Assignment"
 *               description:
 *                 type: string
 *                 example: "Solve all exercises from Chapter 5"
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-04-01T23:59:59.999Z"
 *     responses:
 *       201:
 *         description: Task assigned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 taskId:
 *                   type: string
 *                   example: "65c8f07e2a5a3e001f9c1e74"
 *                 title:
 *                   type: string
 *                   example: "Complete Assignment"
 *                 status:
 *                   type: string
 *                   example: "Pending"
 *                 assignedTo:
 *                   type: string
 *                   example: "605c72b3e3b2e827d8b14b32"
 *                 dueDate:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-04-01T23:59:59.999Z"
 *       400:
 *         description: Bad request - Invalid input
 *       500:
 *         description: Internal server error
 */
router.post("/tasks", authMiddleware, assignTask);

export default router;
