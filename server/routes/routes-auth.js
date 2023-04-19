import Yup from "yup";
import db from "../database/database.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function validateLogin(req, res, next) {
  console.log(req.body);
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

export async function validateSignup(req, res, next) {
  console.log(req.body);
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
    console.log(req.body);
    res.status(400).json({ message: err.message });
  }
}

export async function addUserToDatabase(req, res) {
  const { username, email, password } = req.body;

  try {
    const getUser = await db.query(
      "SELECT * FROM users.user_info WHERE username = $1 OR email = $2",
      [username, email]
    );
    if (getUser.rowCount > 0) {
      return res
        .status(400)
        .json({ success: false, message: "Username or email already exists" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 5);
      console.log(hashedPassword);
      const result = await db.query(
        "INSERT INTO users.user_info (username, email, password) VALUES ($1, $2, $3) RETURNING *",
        [username, email, hashedPassword]
      );
      res.status(201).json({
        success: true,
        message: "User added successfully",
        user: result.rows[0],
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Failed!",
    });
  }
}

export async function getUserFromDatabase(req, res) {
  const { username, password } = req.body;
  try {
    const getUser = await db.query(
      "SELECT * FROM users.user_info WHERE username = $1",
      [username]
    );
    if (getUser.rowCount == 0) {
      return res
        .status(400)
        .json({ success: false, message: "User does not exist" });
    }
    const isPassword = bcrypt.compare(password, getUser.rows[0].password);
    if (!isPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid username or password" });
    } else if (isPassword) {
      const token = jwt.sign({ id: getUser.id }, process.env.JWT_SECRET, {
        expiresIn: "3h",
      });
      return res
        .status(200)
        .json({ success: true, message: "Login successful!", token });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error occured" });
  }
}
