const express = require("express");
const mongoose = require("mongoose");
const Note = require("./models");
const axios = require("axios");

const noteRouter = express.Router();
const notebooksApiUrl = process.env.NOTESBOOKS_API_URL;

const validateId = (req, res, next) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Note not found" });
    }
    next();
}

const errorMiddleware = (err, req, res, next) => {
    return res.status(500).json({ error: err.message });
}

// Create a new note: POST /
noteRouter.post("/", async (req, res) => {
    try {
        const { title, content, notebookId } = req.body;

        let validatedNotebookId = null;

        if(!notebookId) {
            console.info({
                message: "Notebook ID not provided. Storing note without notebook ID",
            });
        } else if(!mongoose.Types.ObjectId.isValid(notebookId)) {
            return res.status(404).json({ error: "Invalid notebook ID", notebookId });
        } else {
            try {
                await axios.get(`${notebooksApiUrl}/${notebookId}`);
            } catch (error) {
                const jsonError = error.toJSON();
                if(jsonError.status === 404) {
                    return res.status(400).json({ error: "Notebook not found", notebookId });
                }
                console.error({
                    message: "Error validating notebook ID",
                    notebookId,
                    error: jsonError
                });
            } finally {
                validatedNotebookId = notebookId;
            }
        }

        if(!title || !content) {
            return res.status(404).json({ error: "Title and content are required" });
        }

        const note = new Note({ title, content, notebookId: validatedNotebookId });
        await note.save();
        return res.status(201).json({ data: note });
    } catch (error) {
        return errorMiddleware(error, req, res, next);
    }
});

// Get all notes: GET /
noteRouter.get("/", async (req, res) => {
    try {
        const notes = await Note.find();
        return res.status(200).json({ data: notes });
    } catch (error) {
        return errorMiddleware(error, req, res, next);
    }
});

// Get a single note: GET /:id
noteRouter.get("/:id", validateId, async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);

        if(!note) {
            return res.status(404).json({ error: "Note not found" });
        }

        return res.status(200).json({ data: note });
    } catch (error) {
        return errorMiddleware(error, req, res, next);
    }
});

// Update a note: PUT /:id
noteRouter.put("/:id", validateId, async (req, res) => {
    try {
        const { title, content } = req.body;

        const note = await Note.findByIdAndUpdate(req.params.id, { title, content }, { new: true });

        if(!note) {
            return res.status(404).json({ error: "Note not found" });
        }

        return res.status(200).json({ data: note });
    } catch (error) {
        return errorMiddleware(error, req, res, next);
    }
});

// Delete a note: DELETE /:id
noteRouter.delete("/:id", validateId, async (req, res) => {
    try {
        const note = await Note.findByIdAndDelete(req.params.id);

        if(!note) {
            return res.status(404).json({ error: "Note not found" });
        }

        return res.sendStatus(204);
    } catch (error) {
        return errorMiddleware(error, req, res, next);
    }
});

module.exports = noteRouter;
