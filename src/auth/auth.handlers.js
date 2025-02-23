import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../database/prisma.js";

const SECRET_KEY = process.env.SECRET_KEY || "supersecreatkey";
const SALT_ROUNDS = process.env.SALT_ROUNDS
  ? parseInt(process.env.SALT_ROUNDS)
  : 10;

/**
 * Reigster Handler
 */
export const registerHandler = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (user) {
    return res.status(400).json({ message: "User already exists!" });
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  await prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      password: hashedPassword,
    },
  });

  res.status(201).json({ message: "User created successfully!" });
};

/**
 * Login Handler
 */
export const loginHandler = async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return res.status(401).json({ message: "User not found!" });
  }

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    return res.status(401).json({ message: "Invalid password!" });
  }

  const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: "1h" });

  res.json({ message: "User logged in successfully!", token });
};
