# 🧩 Task Management System

A full-stack **Task Management Web App** built using **Node.js (Express)** and **React.js** with a **MySQL** database.  
It allows **admins** to create and assign tasks to users, while **users** can view and update their assigned tasks.  
The system also sends **email notifications** when a task is assigned.

---

## 🚀 Features

- User registration and login (JWT-based authentication)
- Role-based access (`admin`, `user`)
- CRUD operations for tasks
- Task assignment and tracking
- Email notification when a task is assigned
- Task filtering and summary dashboard
- Environment variable configuration
- Proper input validation (with Joi)

---

## 🏗️ Tech Stack

**Frontend:** React.js  
**Backend:** Node.js (Express.js)  
**Database:** MySQL  
**Validation:** Joi  
**Email Service:** Nodemailer  
**Authentication:** JWT (JSON Web Token)

---

## ⚙️ Project Setup

### 1️⃣ Clone the Repository

```bash
git clone <your-repo-link>
cd task-management-system
2️⃣ Backend Setup (Node.js + Express)
📁 Navigate to backend folder
cd backend
📦 Install dependencies
npm install

🧾 Create .env file
Create a new file named .env inside the backend directory and copy the example below:

PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASS=your_password
DB_NAME=taskmanager
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

3️⃣ Frontend Setup (React)
📁 Navigate to frontend folder
cd frontend

📦 Install dependencies
npm install

▶️ Run the React app
npm start

4️⃣ Database Setup (MySQL)
Run the following SQL scripts in your MySQL server:

CREATE DATABASE IF NOT EXISTS taskmanager;

USE taskmanager;

-- Users Table
CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin','user') DEFAULT 'user',
  PRIMARY KEY (id)
);

-- Tasks Table
CREATE TABLE tasks (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  assignedTo INT DEFAULT NULL,
  dueDate DATETIME DEFAULT NULL,
  priority ENUM('Low','Medium','High') DEFAULT 'Low',
  status ENUM('Open','In Progress','Done') DEFAULT 'Open',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (assignedTo) REFERENCES users(id) ON DELETE SET NULL
);


📧 Email Notification
Whenever an admin assigns a task to a user, the assigned user receives an email notification containing task details.
The system uses Nodemailer with the credentials specified in your .env file.

🧪 Testing via Postman
After completing setup and running both backend and frontend servers:

▶️ Register an Admin
URL:
POST http://localhost:5000/api/auth/adminRegister
Payload:

{
  "name": "adminName",
  "email": "adminemail@gmail.com",
  "password": "Password"
}
✅ This creates an admin  who can log in and manage all tasks.

📊 Dashboard Overview
Admin Dashboard:

View, assign, and update tasks

View task summaries and filters

User Dashboard:

View tasks assigned to them

Update task status

Receive email notifications when new tasks are assigned

🛠️ Example .env.example
env
Copy code
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASS=
DB_NAME=taskmanager
JWT_SECRET=
EMAIL_USER=
EMAIL_PASS=

🧑‍💻 Author
Aakash Tripathi
Full Stack Developer
(Currently at Techwarezen Pvt Ltd)

