const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
  const attributes = {
    workout_id: { type: DataTypes.STRING, allowNull: false },
    user_id: { type: DataTypes.STRING, allowNull: false },
    exercise: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    reps: { type: DataTypes.STRING, allowNull: false },
    weight: { type: DataTypes.STRING, allowNull: false },
  };

  const options = {
    // defaultScope: {
    //   // exclude hash by default
    //   attributes: { exclude: ["hash"] },
    // },
    // scopes: {
    //   // include hash with this scope
    //   withHash: { attributes: {} },
    // },
  };

  return sequelize.define("Workout", attributes, options);
}
