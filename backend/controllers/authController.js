import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../config/db.js";
import Joi from "joi";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;


const registerSchema = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    "string.empty": "Name is required",
    "string.min": "Name should have at least 3 characters",
  }),
  email: Joi.string().pattern(emailRegex).required().messages({
    "string.pattern.base": "Invalid email format",
    "string.empty": "Email is required",
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "Password must be at least 6 characters long",
  }),
  role: Joi.string().valid("admin", "user").default("user"),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required().messages({
    "string.pattern.base": "Invalid email format",
    "string.empty": "Email is required",
  }),
  password: Joi.string().required().messages({
    "string.empty": "Password is required",
  }),
});



export const register = async (req, res) => {
  try {
  
    const { error, value } = registerSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { name, email, password, role } = value;

   
    const normalizedEmail = email.toLowerCase();


    const [existing] = await db.query("SELECT * FROM users WHERE email = ?", [normalizedEmail]);
    if (existing.length) return res.status(400).json({ message: "Email already exists" });


    const hashed = await bcrypt.hash(password, 10);

    const userRole = role === "admin" ? "admin" : "user";
    await db.query(
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
      [name, normalizedEmail, hashed, userRole]
    );

    res.json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { error, value } = loginSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { email, password } = value;

    const normalizedEmail = email.toLowerCase();

    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [normalizedEmail]);
    if (!rows.length) return res.status(400).json({ message: "Invalid credentials" });

    const user = rows[0];

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: err.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const [users] = await db.query("SELECT id, name, email, role FROM users WHERE role = 'user'");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};