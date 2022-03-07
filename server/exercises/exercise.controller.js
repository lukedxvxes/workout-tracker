const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validateRequest = require("_middleware/validate-request");
const authorize = require("_middleware/authorize");
const exerciseService = require("./exercise.service");

// routes
router.post("/add", authorize(), addSchema, add);
router.get("/", authorize(), getAll);
router.get("/:id", authorize(), getById);
router.put("/:id", authorize(), updateSchema, update);
router.delete("/:id", authorize(), _delete);

module.exports = router;

function addSchema(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().required(),
    targetMuscle: Joi.array().items(Joi.number()).required(),
  });
  validateRequest(req, next, schema);
}

function add(req, res, next) {
  exerciseService
    .create(req.body, req.user)
    .then(() => res.json({ message: "Exercise added successfully" }))
    .catch(next);
}

function getAll(req, res, next) {
  exerciseService
    .getAll()
    .then((exercises) => res.json(exercises))
    .catch(next);
}

function getById(req, res, next) {
  exerciseService
    .getById(req.params.id, req.user)
    .then((exercise) => res.json(exercise))
    .catch(next);
}

function updateSchema(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().empty(""),
    targetMuscle: Joi.array().items(Joi.number()),
  });
  validateRequest(req, next, schema);
}

function update(req, res, next) {
  exerciseService
    .update(req.params.id, req.body, req.user)
    .then((user) => res.json(user))
    .catch(next);
}

function _delete(req, res, next) {
  exerciseService
    .delete(req.params.id, req.user)
    .then(() => res.json({ message: "Exercise deleted successfully" }))
    .catch(next);
}
