const express = require("express");
const supabase = require("../config/supabase");

const router = express.Router();

// GET all inventory
router.get("/", async (req, res) => {
    const { data, error } = await supabase
        .from("inventory")
        .select("*")
        .order("updated_at", { ascending: false });

    if (error) {
        return res.status(500).json({
            error: error.message
        });
    }

    res.json(data);
});

// POST create inventory record
router.post("/", async (req, res) => {
    const {
        product_id,
        warehouse_id,
        quantity
    } = req.body;

    const { data, error } = await supabase
        .from("inventory")
        .insert([
            {
                product_id,
                warehouse_id,
                quantity
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

// PUT update inventory quantity
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { quantity } = req.body;

    const { data, error } = await supabase
        .from("inventory")
        .update({
            quantity,
            updated_at: new Date().toISOString()
        })
        .eq("id", id)
        .select()
        .single();

    if (error) {
        return res.status(500).json({
            error: error.message
        });
    }

    res.json(data);
});

module.exports = router;