import { User } from "./models.js";

export const getUserByEmailAndPassword = async (email, password) => {
  console.log(email, password);
  let user = await User.findOne({ email: email, password: password }).exec();
  // let users = await User.find().exec();
  console.log("helpers", user);
  if (user) {
    return user;
  } else {
    return null;
  }
};
