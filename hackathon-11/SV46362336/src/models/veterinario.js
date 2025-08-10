import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const Veterinario = sequelize.define(
  "Veterinario",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING(100), allowNull: false },
    especializacion: { type: DataTypes.STRING(100), allowNull: false },
    telefono: { type: DataTypes.STRING(11), allowNull: true },
  },
  {
    tableName: "veterinarios",
    timestamps: true,
  }
);

export default Veterinario;