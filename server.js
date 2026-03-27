const express = require('express');
const cors = require('cors');
require("dotenv").config();

const app = express();


app.use(cors());
app.use(express.json());
const itemRoutes = require("./routes/itemRoutes");
app.use("/api/items", itemRoutes);

app.get("/", (req, res) => {
    res.send("🚀 Lost & Found API is running...")
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

