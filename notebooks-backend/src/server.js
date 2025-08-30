const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const notebookRouter = require("./routes");

const app = express();

app.use(bodyParser.json());
app.use("/api/notebooks", notebookRouter);

const port = process.env.PORT;

mongoose.connect(process.env.DB_URL)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(port, () => {
            console.log("Notebooks server is running on port " + port);
        });
    })
    .catch((error) => {
        console.log("Error connecting to MongoDB", error);
    });
    