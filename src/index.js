const express = require("express");
const app = express(); //Runs express
const path = require("path");
const hbs = require("hbs");
const collection = require("./mongodb");

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

  await collection.insertMany([data]);

  res.render("login");
});

//will check whether account exists in DB and allow for login
app.post("/login", async (req, res) => {
  try {
    const check = await collection.findOne({ username: req.body.username });

    if (check.password === req.body.password) {
      res.sendFile(path.join(__dirname, "../frontend/Routinee_Home.html"));
    } else {
      res.send("Wrong password. Please try again.");
    }
  } catch {
    res.send("Account does not exist. Create a new account.");
  }
});

app.listen(3000, () => {
  console.log("Port connected"); //If printed, working fine
});
