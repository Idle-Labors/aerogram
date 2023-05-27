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
    res.status(400).json({ message: err.message });
  }
}

export async function addUserToDatabase(req, res) {
  const { username, email, password } = req.body;
  try {
    const getUser = await db.query(
      "SELECT * FROM users.info WHERE username = $1 OR email = $2",
      [username, email]
    );
    if (getUser.rowCount > 0) {
      return res
        .status(400)
        .json({ success: false, message: "Username or email already exists" });
    } else {
      //SALT ME
      const hashedPassword = await bcrypt.hash(password, 10);
      const result = await db.query(
        "INSERT INTO users.info (username, email, password) VALUES ($1, $2, $3) RETURNING *",
        [username, email, hashedPassword]
      );
      res.status(201).json({
        success: true,
        message: "User added successfully",
        user: result.rows[0],
      });
    }
  } catch (error) {
    console.log(error);
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
      "SELECT * FROM users.info WHERE username = $1",
      [username]
    );
    if (getUser.rowCount == 0) {
      return res
        .status(400)
        .json({ success: false, message: "User does not exist" });
    }
    const isPassword = bcrypt.compare(password, getUser.rows[0].password);
    console.log("Password Commpare Passed");
    if (!isPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid username or password" });
    } else if (isPassword) {
      const token = jwt.sign({ sub: getUser.id }, process.env.JWT_SECRET, {
        expiresIn: "6h",
      });
      //redisClient.rpush('onlineUsers', getUser.rows[0].username);
      return res.status(200).json({
        success: true,
        message: "Login successful!",
        user: getUser.rows[0].username,
        token,
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error occured" });
  }
}

export function verifyToken(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized access" });
  }
  try {
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verifiedToken;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}
