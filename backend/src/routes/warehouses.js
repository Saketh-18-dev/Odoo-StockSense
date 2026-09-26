const express = require("express");
const supabase = require("../config/supabase");

const router = express.Router();

// GET all warehouses
router.get("/", async (req, res) => {
    const { data, error } = await supabase
        .from("warehouses")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        return res.status(500).json({
            error: error.message
        });
    }

    res.json(data);
});

// POST create warehouse
router.post("/", async (req, res) => {
    const { name, location } = req.body;

    const { data, error } = await supabase
        .from("warehouses")
        .insert([
            {
                name,
                location
            }
        ])
        .select()
        .single();

    if (error) {
        return res.status(500).json({
            error: error.message
        });
    }

    res.status(201).json(data);
});

module.exports = router;