const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.get("/", (req, res) => {
    res.json({ message: "Hello from notes!" });
});

const port = process.env.PORT;

mongoose.connect(process.env.DB_URL)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(port, () => {
            console.log("Notes server is running on port " + port);
        });
    })
    .catch((error) => {
        console.log("Error connecting to MongoDB", error);
    });
    