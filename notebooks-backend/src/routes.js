const express = require("express");
const mongoose = require("mongoose");
const Notebook = require("./models");

const notebookRouter = express.Router();
const validateId = (req, res, next) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Notebook not found" });
    }
    next();
}
const errorMiddleware = (err, req, res, next) => {
    return res.status(500).json({ error: err.message });
}

// Create a new notebook: POST /
notebookRouter.post("/", async (req, res) => {
    try {
        const { name, description } = req.body;

        if(!name) {
            return res.status(404).json({ error: "Name is required" });
        }

        const notebook = new Notebook({ name, description });
        await notebook.save();
        return res.status(201).json({ data: notebook });
    } catch (error) {
        return errorMiddleware(error, req, res, next);
    }
});

// Get all notebooks: GET /
notebookRouter.get("/", async (req, res) => {
    try {
        const notebooks = await Notebook.find();
        return res.status(200).json({ data: notebooks });
    } catch (error) {
        return errorMiddleware(error, req, res, next);
    }
});

// Get a single notebook: GET /:id
notebookRouter.get("/:id", validateId, async (req, res) => {
    try {
        const notebook = await Notebook.findById(req.params.id);

        if(!notebook) {
            return res.status(404).json({ error: "Notebook not found" });
        }

        return res.status(200).json({ data: notebook });
    } catch (error) {
        return errorMiddleware(error, req, res, next);
    }
});

// Update a notebook: PUT /:id
notebookRouter.put("/:id", validateId, async (req, res) => {
    try {
        const { name, description } = req.body;

        const notebook = await Notebook.findByIdAndUpdate(req.params.id, { name, description }, { new: true });

        if(!notebook) {
            return res.status(404).json({ error: "Notebook not found" });
        }

        return res.status(200).json({ data: notebook });
    } catch (error) {
        return errorMiddleware(error, req, res, next);
    }
});

// Delete a notebook: DELETE /:id
notebookRouter.delete("/:id", validateId, async (req, res) => {
    try {
        const notebook = await Notebook.findByIdAndDelete(req.params.id);

        if(!notebook) {
            return res.status(404).json({ error: "Notebook not found" });
        }

        return res.sendStatus(204);
    } catch (error) {
        return errorMiddleware(error, req, res, next);
    }
});

module.exports = notebookRouter;
