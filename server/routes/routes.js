import express from "express";
import { validateSignup, validateLogin } from "./routes-auth";
export const api = express.Router();

api.post("/signup", validateSignup);
api.post("/login", validateLogin);
