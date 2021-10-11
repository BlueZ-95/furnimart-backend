import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import {
  checkIfUserExists,
  getAllUsers,
  getUserByEmailAndPassword,
  addUser,
} from "./Utils/helpers.js";
import { products } from "./data/products.js";

const app = express();
const port = 3001;

let baseEndpoint = "localhost:3001/";

app.use(cors());

mongoose.connect("mongodb://localhost:27017/furnimart");

app.get("/users", async (req, res, next) => {
  const email = req.query.email;
  const password = req.query.password;

  try {
    const obj = await getUserByEmailAndPassword(email, password);
    if (obj) {
      console.log("Object Found");
      res.send(obj);
    } else {
      throw new Error("Error! Credentials mismatched");
    }
  } catch (error) {
    next(error);
  }
});

app.get("/addUser", async (req, res, next) => {
  const name = req.query.name;
  const email = req.query.email;
  const password = req.query.password;

  try {
    const user = await checkIfUserExists(email);
    if (!user) {
      // Insert user in DB
      const insertedUser = await addUser(name, email, password);
      console.log("inserted user", insertedUser);
      res.send(insertedUser);
    } else {
      throw new Error("Error! User already exists");
    }
  } catch (error) {
    next(error);
  }
});

app.get("/products", (req, res) => {
  res.send(JSON.stringify(products));
});

app.get("/", (req, res) => {
  getAllUsers();
  // const obj = new User({
  //   name: "Saad",
  //   email: "patelsaad39@gmail.com",
  //   password: "saad123",
  // });
  // obj.save().then(() => console.log("User Added"));
});

app.listen(port, () => {
  console.log(`Amazon-V2 server listening at http://localhost:${port}`);
});
