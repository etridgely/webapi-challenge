const express = require('express');

const projectModel = require('./data/helpers/projectModel');

const router = express.Router();

router.post("/", (req,res) => {
    const project = req.body;

    projectModel.insert(project)
      .then(project => {
        res.status(201).json(project);
      })
      .catch(error => {
          console.log(error);
        res.status(500).json({error})
      })
  })

router.get("/", (req, res) => {
    projectModel
      .get()
        .then(proj => {
          res.status(200).json({proj})
        })
        .catch(error => {
          res.status(500).json({error})
        })
  })

router.get("/:id", validateId, (req, res) => {
    projectModel
      .get(req.params.id)
        .then(proj => {
          res.status(200).json({proj})
        })
        .catch(error => {
          res.status(500).json({error})
        })
  })

router.put("/:id", validateId, (req, res) => {
    projectModel.update(req.params.id, req.body)
      .then(project => {
        res.status(200).json(project)
      })
      .catch(error => {
        res.status(500).json(error)
      })
  })

router.delete("/:id", validateId, (req,res) => {
    projectModel.remove(req.params.id)
      .then(project => {
        res.status(200).json({project})
      })
      .catch(error => [
        res.status(500).json({error})
      ])
  })

function validateId(req, res, next) {
    projectModel.get(req.params.id) 
     .then(user => {
       if (user) {
         next();
       }
       else {
         res.status(404).json({message: "incorrect id"})
       }
     })
  }

module.exports = router;