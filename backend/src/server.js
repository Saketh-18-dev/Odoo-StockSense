const express = require("express");
const cors = require("cors");
require("dotenv").config();

const supabase = require("./config/supabase");

const productRoutes = require("./routes/products");
const warehouseRoutes = require("./routes/warehouses");
const inventoryRoutes = require("./routes/inventory");
const categoryRoutes = require("./routes/categories");
const stockMovementRoutes = require("./routes/stockMovements");

const app = express();

app.use(cors());
app.use(express.json());

// API routes
app.use("/api/products", productRoutes);
app.use("/api/warehouses", warehouseRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/stock-movements", stockMovementRoutes);

// Home route
app.get("/", (req, res) => {
    res.json({
        message: "StockSense backend is running"
    });
});

// Test database connection
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