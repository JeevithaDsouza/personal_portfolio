const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const leadRoutes = require("./routes/leadroutes");
app.use("/api/leads", leadRoutes);

app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});

const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
    const token = req.headers["authorization"];

    if (!token) return res.status(403).send("Access denied");

    try {
        const verified = jwt.verify(token, "secretkey");
        req.user = verified;
        next();
    } catch {
        res.status(400).send("Invalid token");
    }
}

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);