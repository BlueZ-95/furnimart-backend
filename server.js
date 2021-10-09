import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { getUserByEmailAndPassword } from "./Utils/helpers.js";
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

app.get("/products", (req, res) => {
  res.send(JSON.stringify(products));
});

app.get("/", (req, res) => {
  const obj = new User({
    name: "Saad",
    email: "patelsaad39@gmail.com",
    password: "saad123",
  });

  obj.save().then(() => console.log("User Added"));
});

app.listen(port, () => {
  console.log(`Amazon-V2 server listening at http://localhost:${port}`);
});
