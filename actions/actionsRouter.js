const express = require('express');

const Actions = require("../data/helpers/actionModel.js")

const router = express.Router();

// router.get()

// router.post()

// router.update()

// router.delete() 

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

module.exports = router;