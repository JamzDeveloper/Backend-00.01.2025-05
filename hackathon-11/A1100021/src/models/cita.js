import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import Mascota from "./mascota.js";
import Veterinario from "./veterinario.js";

const Cita = sequelize.define(
  "Cita",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    asunto: { type: DataTypes.STRING(100), allowNull: false },
    detalle: { type: DataTypes.TEXT, allowNull: true },
    fecha: { type: DataTypes.DATEONLY, allowNull: false },
    hora: { type: DataTypes.TIME, allowNull: false },
    id_mascota: {
      type: DataTypes.INTEGER,
      references: {
        model: Mascota,
        key: "id",
      },
    },
    id_veterinario: {
      type: DataTypes.INTEGER,
      references: {
        model: Veterinario,
        key: "id",
      },
    },
  },
  {
    tableName: "citas",
    timestamps: true,
  }
);

Mascota.hasMany(Cita, { foreignKey: "id_mascota" });
Cita.belongsTo(Mascota, { foreignKey: "id_mascota" });

Veterinario.hasMany(Cita, { foreignKey: "id_veterinario" });
Cita.belongsTo(Veterinario, { foreignKey: "id_veterinario" });

export default Cita;