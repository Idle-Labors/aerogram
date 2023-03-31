import express from "express";
import Yup from "yup";
export const api = express.Router();

async function validateLogin(req, res, next) {
  const loginSchema = Yup.object().shape({
    username: Yup.string()
      .required("Username Required")
      .max(18, "You reached the maximum number of characters"),
    password: Yup.string()
      .required("Password Required")
      .max(20, "You reached the maximum number of characters"),
  });
  try {
    await loginSchema.validate(req.body);
    next();
  } catch (err) {
    res.status(400).json({ message: "Error" });
  }
}

async function validateSignup(req, res, next) {
  const signupSchema = Yup.object().shape({
    username: Yup.string()
      .required("Username Required")
      .max(18, "You reached the maximum number of characters"),
    email: Yup.string().email("Invalid email").required("Email Required"),
    password: Yup.string()
      .required("Password Required")
      .max(20, "You reached the maximum number of characters"),
    passwordCheck: Yup.string()
      .required("Confirm Password Required")
      .oneOf([Yup.ref("password")], "Passwords must match"),
  });
  try {
    await signupSchema.validate(req.body);
    next();
  } catch (err) {
    res.status(400).json({ message: "Error" });
  }
}

api.post("/signup", validateSignup);
api.post("/login", validateLogin);
