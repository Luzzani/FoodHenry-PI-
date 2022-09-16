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
        type: DataTypes.STRING,
        defaultValue:
          "https://img.freepik.com/foto-gratis/tabla-cortar-madera-rodeada-platos-pasta-e-ingredientes-mesa_23-2148246798.jpg?w=996&t=st=1663015250~exp=1663015850~hmac=d98270e7af7ce1a30a0c9b7993beb38c974b9982d5fa1eabdd605671d1b11da0",
      },
    },
    {
      timestamps: false,
    }
  );
};
