const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validateRequest = require("_middleware/validate-request");
const authorize = require("_middleware/authorize");
const workoutService = require("./workout.service");

// routes
router.post("/add", authorize(), addSchema, add);
router.get("/", authorize(), getAll);
router.get("/:id", authorize(), getById);
router.get("/all/:id", authorize(), getByWorkoutId);
router.put("/:id", authorize(), updateSchema, update);
router.delete("/:id", authorize(), _delete);

module.exports = router;

function addSchema(req, res, next) {
  const schema = Joi.object({
    exercise: Joi.array().items(Joi.number()).required(),
    reps: Joi.string().required(),
    weight: Joi.string().required(),
  });
  validateRequest(req, next, schema);
}

function add(req, res, next) {
  workoutService
    .create(req.body, req.user)
    .then(() => res.json({ message: "Workout added successfully" }))
    .catch(next);
}

function getAll(req, res, next) {
  workoutService
    .getAll()
    .then((workouts) => res.json(workouts))
    .catch(next);
}

function getById(req, res, next) {
  workoutService
    .getById(req.params.id)
    .then((workout) => res.json(workout))
    .catch(next);
}

function getByWorkoutId(req, res, next) {
  workoutService
    .getByWorkoutId(req.params.id)
    .then((workout) => res.json(workout))
    .catch(next);
}

function updateSchema(req, res, next) {
  const schema = Joi.object({
    reps: Joi.string(),
    weight: Joi.string(),
  });
  validateRequest(req, next, schema);
}

function update(req, res, next) {
  workoutService
    .update(req.params.id, req.body)
    .then((workout) => res.json(workout))
    .catch(next);
}

function _delete(req, res, next) {
  workoutService
    .delete(req.params.id)
    .then(() => res.json({ message: "Workout deleted successfully" }))
    .catch(next);
}
