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

module.exports = router;