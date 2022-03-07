const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
  const attributes = {
    user_id: { type: DataTypes.INTEGER },
    name: { type: DataTypes.STRING, allowNull: false },
    targetMuscle: {
      type: DataTypes.JSON,
      allowNull: false,
    },
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

  return sequelize.define("Exercise", attributes, options);
}
