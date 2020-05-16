const express = require('express');

const Projects = require("../data/helpers/projectModel");

const Actions = require("../data/helpers/actionModel");

const router = express.Router();

router.get("/", (req, res) => {
    Projects.get(req.query)
        .then(projects => {
            res.status(200).json(projects);
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({
                error: "The projects' information could not be retrieved."
            })
        })
});

router.get("/:id", validateProjectId, (req, res) => {
    Projects.get(req.params.id)
    .then(project => {
         res.status(200).json(project);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error:"The project information could not be retrieved."
      })
    })
});

router.post('/', validateProject, (req, res) => {
    Projects.insert(req.body)
        .then(project => {
            res.status(201).json(project);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "There was an error while saving the project to the database"})
        })
});

router.put("/:id", validateProject, validateProjectId, (req, res) => {
    Projects.update(req.params.id, req.body)
        .then(project => {
            res.status(200).json(project);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                error: "The project information could not be modified."
            })
        })
});

router.delete("/:id", validateProjectId,(req, res) => {
    Projects.remove(req.params.id)
        .then(project => {
            res.status(200).json(project);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                error: "The project could not be removed" 
            })
        });
});

router.get('/:id/actions', validateProjectId, (req, res) => {
    Projects.getProjectActions(req.params.id)
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

// Here is my custom middleware

function validateProjectId(req, res, next) {
    Projects.get(req.params.id)
        .then(project => {
            if (!project) {
                res.status(404).json({ message:"invalid project id"});
            } else {
                req.project = project;
                next();
            }
        })
}

function validateProject (req, res, next) {
    if (Object.keys(req.body).length === 0) {
      res.status(400).json({ message: "missing project info"})
    } else if (!req.body.name && !req.body.description) {
      res.status(400).json({ message: "missing project name and description"})
    } else if (req.body) {
      return next()
    }
  }

module.exports = router;
