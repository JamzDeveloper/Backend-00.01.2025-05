import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import Especialidad from "./especialidad.js";

const Veterinario = sequelize.define(
  "Veterinario",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING(100), allowNull: false },
    telefono: { type: DataTypes.STRING(11), allowNull: true },
    id_especialidad: {
      type: DataTypes.INTEGER,
      references: {
        model: Especialidad,
        key: "id",
      },
    },
  },
  {
    tableName: "veterinarios",
    timestamps: true,
  }
);

Especialidad.hasOne(Veterinario, { foreignKey: "id_especialidad" });
Veterinario.belongsTo(Especialidad, { foreignKey: "id_especialidad" });

export default Veterinario;