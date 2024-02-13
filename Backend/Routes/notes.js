const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const router = express.Router();
const Notes = require("../Models_database/Notes");
const { body, validationResult } = require('express-validator');


//Route 1 GET /fetchallnotes all the notes of a given user
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    const notes = await Notes.find({ user: req.user.id })
    res.send(notes)
})
//Route 2 Post /addnote to add a new note
router.post('/addnote', fetchuser,
    [body('title', 'Enter a Valid Title').isLength({ min: 3 }),
    body('description', 'Enter valid description').isLength({ min: 5 })]
    , async (req, res) => {
        const { title, description, tag } = req.body;
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.send({ errors: result.array() });
        }
        try {
            const note = await new Notes({
                title, description, tag, user: req.user.id
            })
            const saved_note = await note.save();
            res.send(saved_note)
        } catch (error) {
            console.log(error.message);
            res.status(500).send({ error: "Some internal error occured" })
        }

    })

//Update an existing note using PUT /updatenote
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    const newNote = {};
    if (title) { newNote.title = title }
    if (description) { newNote.description = description }
    if (tag) { newNote.tag = tag }
    try {


        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Note Not found");
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })

        res.json(note);
    }
    catch (error) {
        console.log(error.msg);
        res.status(500).send("Some internal server error occured")

    }
})
//ROUTE 4
//Delete the Note using DELETE /deletenote
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        //finding the note to delete using id and delete it
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Note Not found");
        }
        //allow deletion only if user is bind to the same not
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Notes.findByIdAndDelete(req.params.id)

        res.json({ "status": "Success Note has been deleted" });
    }
    catch (error) {
        console.log(error.msg);
        res.status(500).send("Some internal server error occured")
    }
})
module.exports = router