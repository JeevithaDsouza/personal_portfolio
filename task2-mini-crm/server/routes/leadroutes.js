const express = require("express");
const router = express.Router();
const Lead = require("../models/lead");

// CREATE lead (from contact form)
router.post("/add", async (req, res) => {
    try {
        const lead = new Lead(req.body);
        await lead.save();
        res.json({ message: "Lead added successfully" });
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET all leads
router.get("/", async (req, res) => {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.json(leads);
});

// UPDATE status
router.put("/:id", async (req, res) => {
    await Lead.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: "Updated" });
});

module.exports = router;

// only admin can view leads
router.get("/", verifyToken, async (req, res) => {
    const leads = await Lead.find();
    res.json(leads);
});