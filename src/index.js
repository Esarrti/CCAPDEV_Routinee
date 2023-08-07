const express = require("express");
const app = express(); //Runs express
const path = require("path");
const hbs = require("hbs");
const collection = require("./mongodb");
const bcrypt = require("bcrypt");

const templatePath = path.join(__dirname, "../templates");

app.use(express.json());
app.set("view engine", "hbs");
app.set("views", templatePath);
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(express.static("frontend"));

app.get("/", (req, res) => {
  res.render("login");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

//will store signup information in database
app.post("/signup", async (req, res) => {
  const data = {
    username: req.body.username,
    password: req.body.password,
    nickname: req.body.nickname,
    birthday: req.body.birthday,
    gender: req.body.gender,
  };

  try {
    // Generate a salt to use for hashing
    const salt = await bcrypt.genSalt(10);

    // Hash the user's password using the salt
    const hashedPassword = await bcrypt.hash(data.password, salt);

    // Store the hashed password in the data object
    data.password = hashedPassword;

    // Save the user data to the database
    await collection.insertMany([data]);

    res.render("login");
  } catch (error) {
    console.error("Error while hashing password:", error);
    res.send("An error occurred during signup.");
  }
});

//will check whether account exists in DB and allow for login
app.post("/login", async (req, res) => {
  try {
    // Retrieve the user from the database based on the username
    const user = await collection.findOne({ username: req.body.username });

    if (!user) {
      // User not found
      return res.send("Account does not exist. Create a new account.");
    }

    // Compare the provided password with the hashed password stored in the database
    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (isPasswordValid) {
      // Password is correct, redirect to the home page
      res.sendFile(path.join(__dirname, "../frontend/Routinee_Home.html"));
    } else {
      // Password is incorrect
      res.send("Wrong password. Please try again.");
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.send("An error occurred during login.");
  }
});

app.listen(3000, () => {
  console.log("Port connected"); //If printed, working fine
});
