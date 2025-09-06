import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const Animal = sequelize.define(
  "Animal",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING(100), allowNull: false },
  },
  {
    tableName: "animales",
    timestamps: true,
  }
);

export default Animal;