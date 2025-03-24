# Student Management System API
 
This is a Student Management System API built with Express.js, TypeScript, and MongoDB Atlas. The API allows an admin to manage students and tasks, while students can view and update their tasks.
 
## Getting Started
 
1. Clone the Repository:
   git clone https://github.com/your-username/student-management-api.git
   cd student-management-api
 
2. Install Dependencies:
   npm install
 
3. Set Up Environment Variables:
   Create a `.env` file in the root directory and add:
 
   PORT=5000
   MONGO_URI=your_mongodb_atlas_url
   JWT_SECRET=your_jwt_secret
 
4. Build the Project:
   npm run build
 
5. Start the Server:
   node dist/server.js
 
   For development mode:
   npm run dev
 
## API Endpoints
 
### Admin Routes
- POST `/api/adminlogin` → Admin Login (No Auth)
- POST `/api/students` → Add Student (Auth Required)
- POST `/api/tasks` → Assign Task (Auth Required)
 
### Student Routes
- POST `/api/login` → Student Login (No Auth)
- PUT `/api/tasks` → Update Task Status (Auth Required)
- GET `/api/getTasks/:id` → Get Student Tasks (Auth Required)
 
## API Documentation
Swagger API documentation is available at and Sample data:
http://localhost:5000/api-docs
 
 
## API Documentation
Published Url available at:
https://restless-shadow-286315.postman.co/workspace/Team-Workspace~bce82c19-5046-440e-81c7-465fd403c125/overview
 
 