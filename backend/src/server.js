
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const supabase = require("./config/supabase");
const productRoutes = require("./routes/products");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "StockSense backend is running"
    });
});
app.get("/test-db", async (req, res) => {
    const { data, error } = await supabase
        .from("products")
        .select("*");

    if (error) {
        return res.status(500).json({
            error: error.message
        });
    }

    res.json(data);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});