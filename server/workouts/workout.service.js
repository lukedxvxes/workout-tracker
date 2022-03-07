const config = require("config.json");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("_helpers/db");
const cuid = require("cuid");

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
  params.workout_id = await getMostRecentWorkoutId(user.id);

  //user_id
  params.user_id = user.id;

  //exercise by id
  params.exercise = await getExerciseObjArr(params.exercise);

  await db.Workout.create(params);
}

async function update(id, params, user) {
  const workout = await getWorkout(id);
  const exID = parseInt(workout.dataValues.user_id);

  if (exID !== user.id) {
    throw "Cant update another users workout";
  }

  Object.assign(workout, params);
  await workout.save();

  return workout.get();
}

async function _delete(id, user) {
  const exercise = await getWorkout(id);
  const exID = parseInt(exercise.dataValues.user_id);
  if (exID !== user.id) {
    throw "Cant delete another users workout";
  }

  await exercise.destroy();
}

// helper functions

async function getWorkout(id) {
  const workout = await db.Workout.findOne({
    where: {
      id: id,
    },
  });

  if (!workout) throw "Workout not found";
  return workout;
}

async function getByWorkoutId(workoutId, userId) {
  const workouts = await db.Workout.findAll({
    where: { workout_id: workoutId, user_id: userId },
  });

  if (!workouts.length) throw "Workout not found";

  return workouts;
}

async function getExerciseObjArr(ids) {
  const exerciseObjArr = [];

  for (const id of ids) {
    if (!(await db.Exercise.findOne({ where: { id: parseInt(id) } }))) {
      throw `Exercise ${id} doesnt exist`;
    }

    const exerciseObj = await exerciseService.getById(id);
    exerciseObjArr.push(exerciseObj);
  }

  return exerciseObjArr;
}

async function getMostRecentWorkoutId(userId) {
  //return workout_id - exercises on the same day get the same workout_id

  let workout_id;
  let mostRecent;

  try {
    mostRecent = await db.Workout.findOne({
      where: { user_id: userId },
      order: [["id", "DESC"]],
    });

    mostRecent = mostRecent.get({ plainText: true });

    const lastEntryDate = mostRecent.createdAt.toISOString().slice(0, 10);
    const todaysDate = new Date().toISOString().slice(0, 10);

    if (lastEntryDate === todaysDate) {
      workout_id = mostRecent.workout_id;
    } else {
      workout_id = cuid();
    }
  } catch (error) {
    mostRecent = null;
    workout_id = cuid();
  }

  return workout_id;
}
