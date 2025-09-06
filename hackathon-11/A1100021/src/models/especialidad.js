import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const Especialidad = sequelize.define(
  "Especialidad",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING(100), allowNull: false },
    descripcion: { type: DataTypes.STRING(100), allowNull: true },
  },
  {
    tableName: "especialidades",
    timestamps: true,
  }
);

export default Especialidad;