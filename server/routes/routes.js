import express from "express";
import {
  validateSignup,
  validateLogin,
  addUserToDatabase,
  getUserFromDatabase,
} from "./routes-auth";
export const api = express.Router();

api.post("/signup", validateSignup, addUserToDatabase);
api.post("/login", validateLogin, getUserFromDatabase);
