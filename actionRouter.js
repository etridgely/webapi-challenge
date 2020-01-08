const express = require('express');

const actionModel = require("./data/helpers/actionModel");

const router = express.Router();

router.get("/", validateId, (req, res) => {

  actionModel
    .get()
      .then(user => {
        res.status(200).json(user)
      })

      .catch(error => {
        res.status(500).json(error)
      })
})

router.post("/", validatePost, (req,res) => {

  actionModel.insert()
    .then(action => {
      res.status(201).json(action)
    })

    .catch(error => {
      res.status(500).json(error)
    })
})

router.put("/:id", validateId, (req,res) => {
    const id = req.params.id;
    const update = req.body;

  actionModel.update(id, update)
    .then(project => {
      res.status(201).json({project})
    })
    .catch(error => {
      res.status(500).json({error})
    })
})

router.delete("/:id", validateId, (req,res) => {

  actionModel.remove(req.params.id)
    .then(action => {
      res.status(200).json(action)
    })
    .catch(error => {
      res.status(500).json({message: error})
    })
})

function validateId(req, res, next) {

  actionModel.get(req.params.id) 
   .then(user => {

     if (user) {
       next();
     }
     else {
       res.status(404).json({message: "improper id"})
     }
   })
}

function validatePost(req, res, next) {
  if (!req.body.project_id || !req.body.description || !req.body.notes) {
    res.status(400).json({message: "missing proper input field"})
  }
  else if (!req.body) {
    res.status(400).json({message: "interesting"})
  }
  next();
}

module.exports = router;