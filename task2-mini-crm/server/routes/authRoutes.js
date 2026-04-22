const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const ADMIN = {
    username: "admin",
    password: "1234"
};

// LOGIN
router.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (username === ADMIN.username && password === ADMIN.password) {
        const token = jwt.sign({ user: "admin" }, "secretkey");
        return res.json({ token });
    }

    res.status(401).json({ message: "Invalid credentials" });
});

module.exports = router;