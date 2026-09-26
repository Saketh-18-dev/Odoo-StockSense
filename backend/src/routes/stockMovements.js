const express = require("express");
const supabase = require("../config/supabase");

const router = express.Router();

// Get recent stock movements
router.get("/", async (req, res) => {
    const { data, error } = await supabase
        .from("stock_movements")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        return res.status(500).json({
            error: error.message
        });
    }

    res.json(data);
});

// Create stock movement
router.post("/", async (req, res) => {
    const {
        product_id,
        warehouse_id,
        movement_type,
        quantity_change,
        reference_id
    } = req.body;

    const { data, error } = await supabase
        .from("stock_movements")
        .insert([
            {
                product_id,
                warehouse_id,
                movement_type,
                quantity_change,
                reference_id
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