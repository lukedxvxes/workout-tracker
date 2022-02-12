const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validateRequest = require("_middleware/validate-request");
const authorize = require("_middleware/authorize");
const targetMuscleService = require("./targetMuscle.service");

// routes
router.post("/add", addSchema, add);
router.get("/", authorize(), getAll);
router.get("/:id", authorize(), getById);
router.put("/:id", authorize(), updateSchema, update);
router.delete("/:id", authorize(), _delete);

module.exports = router;

function addSchema(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().required(),
  });
  validateRequest(req, next, schema);
}

function add(req, res, next) {
  targetMuscleService
    .create(req.body)
    .then(() => res.json({ message: "targetMuscle added successfully" }))
    .catch(next);
}

function getAll(req, res, next) {
  targetMuscleService
    .getAll()
    .then((targetMuscles) => res.json(targetMuscles))
    .catch(next);
}

function getById(req, res, next) {
  targetMuscleService
    .getById(req.params.id)
    .then((user) => res.json(user))
    .catch(next);
}

function updateSchema(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().empty(""),
    targetMuscle: Joi.string().empty(""),
  });
  validateRequest(req, next, schema);
}

function update(req, res, next) {
  targetMuscleService
    .update(req.params.id, req.body)
    .then((user) => res.json(user))
    .catch(next);
}

function _delete(req, res, next) {
  targetMuscleService
    .delete(req.params.id)
    .then(() => res.json({ message: "targetMuscle deleted successfully" }))
    .catch(next);
}
