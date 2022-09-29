const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "recipe",
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      summary: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      healthScore: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 0,
          max: 100,
        },
      },
      steps: {
        type: DataTypes.ARRAY(DataTypes.JSONB),
      },
      image: {
        type: DataTypes.TEXT,
        defaultValue:
          "https://st3.depositphotos.com/5984660/12584/v/600/depositphotos_125843360-stock-illustration-chef-preparing-soup-and-reading.jpg",
      },
    },
    {
      timestamps: false,
    }
  );
};
