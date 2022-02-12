const config = require("config.json");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("_helpers/db");
const targetMuscleService = require("../targetMuscle/targetMuscle.service");
const exerciseService = require("../targetMuscle/targetMuscle.service");
module.exports = {
  authenticate,
  getAll,
  getById,
  getExercise,
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
  return await db.Exercise.findAll();
}

async function getById(id) {
  return await getExercise(id);
}

async function create(params) {
  //transform name
  params.name = params.name.replace(/ /g, "-").toLowerCase();
  // validate
  if (await db.Exercise.findOne({ where: { name: params.name } })) {
    throw 'Name "' + params.name + '" is already taken';
  }

  const targetMuscleIds = params.targetMuscle;
  const targetMuscleObjArr = [];

  for (const id of targetMuscleIds) {
    if (!(await db.TargetMuscle.findOne({ where: { id: id } }))) {
      throw `Target Muscle ${id} doesnt exist`;
    }

    const targetMuscleObj = await targetMuscleService.getTargetMuscle(id);
    targetMuscleObjArr.push(targetMuscleObj);
  }

  params.targetMuscle = targetMuscleObjArr;

  await db.Exercise.create(params);
}

async function update(id, params) {
  const exercise = await getExercise(id);

  Object.assign(exercise, params);
  await exercise.save();

  return exercise.get();
}

async function _delete(id) {
  const exercise = await getExercise(id);
  await exercise.destroy();
}

// helper functions

async function getExercise(id) {
  const exercise = await db.Exercise.findByPk(id);
  if (!exercise) throw "Exercise not found";
  return exercise;
}
