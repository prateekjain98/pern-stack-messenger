const express = require("express");
const validateForm = require("../controllers/validateForm");
const router = express.Router();
const pool = require("../database");
const bcrypt = require("bcrypt");

router.post("/login", async (req, res) => {
  validateForm(req, res);
  console.log(req.session.user)
  const authenticateUser = await pool.query("SELECT id, username, passhash FROM users u WHERE u.username=$1", [req.body.username]);
  if (authenticateUser.rowCount > 0) {
    const isPasswordCorrect = await bcrypt.compare(req.body.password, authenticateUser.rows[0].passhash);
    if (isPasswordCorrect) {
      //login
      req.session.user = {
        username: req.body.username,
        id: authenticateUser.rows[0].id,
      };
      res.json({ loggedIn: true, username: req.body.username });
    } else {
      console.log("Not good");
      res.json({ loggedIn: false, status: "Wrong username or password" });
    }
  } else {
    console.log("Not good");
    res.json({ loggedIn: false, status: "Wrong username or password" });
  }
});

router.post("/signup", async (req, res) => {
  validateForm(req, res);
  const existingUser = await pool.query("SELECT username from users WHERE username=$1", [req.body.username]);
  if (existingUser.rowCount === 0) {
    //register
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUserQuery = await pool.query("INSERT INTO users(username, passhash) values($1,$2) RETURNING id, username", [
      req.body.username,
      hashedPassword,
    ]);
    req.session.user = {
      username: req.body.username,
      id: newUserQuery.rows[0].id,
    };
    res.json({ loggedIn: true, username: req.body.username });
  } else {
    res.json({ loggedIn: false, statusMessage: "Username taken" });
  }
});

module.exports = router;
