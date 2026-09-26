const express = require("express");
const supabase = require("../config/supabase");

const router = express.Router();

router.get("/", async (req, res) => {
    const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        return res.status(500).json({
            error: error.message
        });
    }

    res.json(data);
});
router.post("/", async (req, res) => {
    const {
        name,
        sku,
        category_id,
        unit_of_measure,
        reorder_level
    } = req.body;

    const { data, error } = await supabase
        .from("products")
        .insert([
            {
                name,
                sku,
                category_id,
                unit_of_measure,
                reorder_level
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
router.put("/:id", async (req, res) => {
    const { id } = req.params;

    const {
        name,
        sku,
        category_id,
        unit_of_measure,
        reorder_level
    } = req.body;

    const { data, error } = await supabase
        .from("products")
        .update({
            name,
            sku,
            category_id,
            unit_of_measure,
            reorder_level
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
router.delete("/:id", async (req, res) => {
    const { id } = req.params;

    const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", id);

    if (error) {
        return res.status(500).json({
            error: error.message
        });
    }

    res.json({
        message: "Product deleted successfully"
    });
});
module.exports = router;