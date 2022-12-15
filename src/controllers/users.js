import { ZodError } from "zod";
import bcrypt from "bcrypt";
import { pool } from "../connection/conect.js";
import { UserData } from "../validations/userInput.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const register = async (req, res) => {
  try {
    const userData = UserData.parse({ ...req.body });

    const checkingEmail = await pool.query(
      `
      SELECT * FROM users WHERE email = $1
  `,
      [userData.email]
    );

    if (checkingEmail.rowCount > 0) {
      return res.status(400).json({
        message: "Já existe usuário cadastrado com o e-mail informado.",
      });
    }

    const encryptedPassword = await bcrypt.hash(userData.password, 10);

    const { rows } = await pool.query(
      `
        INSERT INTO users (name, email, password)
        VALUES($1, $2, $3) RETURNING *
    `,
      [userData.name, userData.email, encryptedPassword]
    );

    const { password: _, ...registeredUser } = rows[0];

    return res.status(201).json({ ...registeredUser });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ message: error.flatten().fieldErrors });
    }
    console.log(error.message);
    return res.status(500).json({ message: "Internal server error." });
  }
};
