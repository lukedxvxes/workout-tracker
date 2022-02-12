const config = require("config.json");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("_helpers/db");

module.exports = {
  authenticate,
  getAll,
  getById,
  create,
  update,
  delete: _delete,
  getTargetMuscle,
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
  return await db.TargetMuscle.findAll();
}

async function getById(id) {
  return await getTargetMuscle(id);
}

async function create(params) {
  //transform name
  params.name = params.name.replace(/ /g, "-").toLowerCase();
  // validate
  if (await db.TargetMuscle.findOne({ where: { name: params.name } })) {
    throw 'Name "' + params.name + '" is already taken';
  }

  // save user
  await db.TargetMuscle.create(params);
}

async function update(id, params) {
  const targetMuscle = await getTargetMuscle(id);

  // copy params to user and save
  Object.assign(targetMuscle, params);
  await targetMuscle.save();

  return targetMuscle.get();
}

async function _delete(id) {
  const targetMuscle = await getTargetMuscle(id);
  await targetMuscle.destroy();
}

// helper functions

async function getTargetMuscle(id) {
  const targetMuscle = await db.TargetMuscle.findByPk(id);
  if (!targetMuscle) throw "targetMuscle not found";
  return targetMuscle;
}
