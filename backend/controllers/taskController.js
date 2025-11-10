import db from "../config/db.js";
import nodemailer from "nodemailer";
export const createTask = async (req, res) => {
  try {
    const { title, description, assignedTo, dueDate, priority } = req.body;

   
    await db.query(
      "INSERT INTO tasks (title, description, assignedTo, dueDate, priority) VALUES (?, ?, ?, ?, ?)",
      [title, description, assignedTo || null, dueDate, priority]
    );

  
    if (assignedTo) {
      const [userResult] = await db.query("SELECT name, email FROM users WHERE id = ?", [assignedTo]);

      if (userResult.length > 0) {
        const { name, email } = userResult[0];

     
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.EMAIL_USER, 
            pass: process.env.EMAIL_PASS, 
          },
        });

  
        const mailOptions = {
          from: `"Task Management System" <${process.env.EMAIL_USER}>`,
          to: email,
          subject: `New Task Assigned: ${title}`,
          html: `
            <h2>Hi ${name},</h2>
            <p>You have been assigned a new task.</p>
            <p><strong>Title:</strong> ${title}</p>
            <p><strong>Description:</strong> ${description || "No description provided"}</p>
            <p><strong>Priority:</strong> ${priority}</p>
            <p><strong>Due Date:</strong> ${dueDate || "Not specified"}</p>
            <p>Please log in to your dashboard to view more details.</p>
            <br/>
            <p>– Task Management System</p>
          `,
        };

       
        await transporter.sendMail(mailOptions);
      }
    }

 
    res.json({ message: "Task created and email sent (if assigned)" });
  } catch (err) {
    console.error("Error creating task:", err);
    res.status(500).json({ error: err.message });
  }
};

export const getTasks = async (req, res) => {
  try {
    const { status, priority, page = 1, limit = 6 } = req.query;
    const offset = (page - 1) * limit;

    let query = "SELECT * FROM tasks WHERE 1=1";
    const params = [];

    if (status) {
      query += " AND status = ?";
      params.push(status);
    }

    if (priority) {
      query += " AND priority = ?";
      params.push(priority);
    }

 
    const [countResult] = await db.query(
      query.replace("*", "COUNT(*) AS total"),
      params
    );
    const total = countResult[0].total;
    const totalPages = Math.ceil(total / limit);

  
    query += " LIMIT ? OFFSET ?";
    params.push(Number(limit), Number(offset));

    const [rows] = await db.query(query, params);

    res.json({
      tasks: rows,
      pagination: { total, totalPages },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};






export const getUserTasks = async (req, res) => {
  try {
    const { userId, status, priority, page = 1, limit = 6 } = req.query;
    const offset = (page - 1) * limit;

    
    let query = "SELECT * FROM tasks WHERE assignedTo = ?";
    const params = [userId];

    if (status) {
      query += " AND status = ?";
      params.push(status);
    }

    if (priority) {
      query += " AND priority = ?";
      params.push(priority);
    }

  
    const [countResult] = await db.query(
      query.replace("*", "COUNT(*) AS total"),
      params
    );
    const total = countResult[0].total;
    const totalPages = Math.ceil(total / limit);

   
    query += " ORDER BY id DESC LIMIT ? OFFSET ?";
    params.push(Number(limit), Number(offset));

    const [rows] = await db.query(query, params);

    res.json({
      tasks: rows,
      pagination: { total, totalPages },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



export const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;

 
    const [rows] = await db.query("SELECT * FROM tasks WHERE id = ?", [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error("Error fetching task:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const adminUpdateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status, priority, assignedTo, dueDate } = req.body;

    // Convert ISO date ("2025-11-19T18:30:00.000Z") → MySQL DATETIME ("2025-11-19 18:30:00")
    const formattedDueDate = dueDate ? new Date(dueDate).toISOString().slice(0, 19).replace('T', ' ') : null;

    await db.query(
      "UPDATE tasks SET title = ?, description = ?, status = ?, priority = ?, assignedTo = ?, dueDate = ? WHERE id = ?",
      [title, description, status, priority, assignedTo, formattedDueDate, id]
    );

    res.json({ message: "Task updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};



export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query("DELETE FROM tasks WHERE id = ?", [id]);
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateTaskUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    await db.query("UPDATE tasks SET status = ? WHERE id = ?", [status, id]);
    res.json({ message: "Task updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};