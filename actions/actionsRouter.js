const express = require('express');

const Actions = require("../data/helpers/actionModel.js")

const router = express.Router();

router.get('/:id', validateActionId, (req, res) => {
    Actions.get(req.params.id)
        .then(actions => {
            res.status(200).json(actions);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                error:"The actions could not be retrieved."
            })
        })
});

router.post('/', validateAction, (req, res) => {
    Actions.insert(req.body)
        .then(action => {
            res.status(201).json(action);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "There was an error while saving the action to the project"})
        })
})

router.put('/:id', validateActionId, validateAction, (req, res) => {
    Actions.update(req.params.id, req.body)
        .then(action => {
            res.status(200).json(action);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                error: "The action information could not be modified."
            })
        })
});

router.delete('/:id', validateActionId, (req, res) => {
    Actions.remove(req.params.id)
        .then(action => {
            res.send({ message: "Action deleted successfully."}).status(200).json(action);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                error: "The action could not be removed" 
            })
        })
})

// Here is my custom middleware

function validateActionId (req, res, next) {
    Actions.get(req.params.id)
    .then(action => {
        if (!action) {
            res.status(404).json({ message:"invalid action id"});
        } else {
            req.action = action;
            next();
        }
    })
}

function validateAction (req, res, next) {
    if (Object.keys(req.body).length === 0) {
      res.status(400).json({ message: "Missing required action information"})
    } else if (!req.body.project_id && !req.body.description && !req.body.notes) {
      res.status(400).json({ message: "Missing action description and notes"})
    } else if (req.body) {
      return next()
    }
}

module.exports = router;