const config = require("config.json");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("_helpers/db");

const exerciseService = require("../exercises/exercise.service");
module.exports = {
  authenticate,
  getAll,
  getById,
  getByWorkoutId,
  create,
  update,
  delete: _delete,
};
async function authenticate({ username, password }) {
  const user = await db.User.scope("withHash").findOne({ where: { username } });

  if (!user || !(await bcrypt.compare(password, user.hash)))
    throw "Username or password is incorrect";

  // authentication successful
  const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: "7d" });
  return { ...omitHash(user.get()), token };
}

async function getAll() {
  return await db.Workout.findAll();
}

async function getById(id) {
  return await getWorkout(id);
}

async function create(params, user) {
  //transform strings
  params.reps = params.reps.trim();
  params.weight = params.weight.trim();

  //workoutID
  params.workout_id = await getMostRecentWorkoutId();

  //user_id
  params.user_id = user.id;

  //exercise by id
  params.exercise = await getExerciseObjArr(params.exercise);

  await db.Workout.create(params);
}

async function update(id, params) {
  const exercise = await getWorkout(id);

  Object.assign(exercise, params);
  await exercise.save();

  return exercise.get();
}

async function _delete(id) {
  const exercise = await getWorkout(id);
  await exercise.destroy();
}

// helper functions

async function getWorkout(id) {
  const workout = await db.Workout.findByPk(id);
  if (!workout) throw "Workout not found";
  return workout;
}

async function getByWorkoutId(workoutId) {
  const workouts = await db.Workout.findAll({
    where: { workout_id: workoutId },
  });
  if (!workouts) throw "Workout not found";
  return workouts;
}

async function getExerciseObjArr(ids) {
  const exerciseObjArr = [];

  for (const id of ids) {
    if (!(await db.Exercise.findOne({ where: { id: id } }))) {
      throw `Exercise ${id} doesnt exist`;
    }

    const exerciseObj = await exerciseService.getById(id);
    exerciseObjArr.push(exerciseObj);
  }

  return exerciseObjArr;
}

async function getMostRecentWorkoutId() {
  //return workout_id - exercises on the same day get the same workout_id
  // default : 1

  let workout_id;
  let mostRecent;

  try {
    mostRecent = await db.Workout.findOne({
      where: { id: !null },
      order: [["id", "DESC"]],
    });

    mostRecent = mostRecent.get({ plainText: true });

    const lastEntryDate = mostRecent.createdAt.toISOString().slice(0, 10);
    const todaysDate = new Date().toISOString().slice(0, 10);

    if (lastEntryDate === todaysDate) {
      workout_id = mostRecent.workout_id;
    } else {
      workout_id = parseInt(mostRecent.workout_id) + 1;
    }
  } catch (error) {
    mostRecent = null;
    workout_id = 1;
  }

  return workout_id;
}
