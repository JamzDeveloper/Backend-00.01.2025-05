import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import Cita from "./cita.js";

const Tratamiento = sequelize.define(
  "Tratamiento",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    descripcion: { type: DataTypes.STRING(100), allowNull: false },
    costo: { type: DataTypes.FLOAT, allowNull: false },
    id_cita: {
      type: DataTypes.INTEGER,
      references: {
        model: Cita,
        key: "id",
      },
    },
  },
  {
    tableName: "tratamientos",
    timestamps: true,
  }
);

Cita.hasMany(Tratamiento, { foreignKey: "id_cita" });
Tratamiento.belongsTo(Cita, { foreignKey: "id_cita", as: 'Cita' });

export default Tratamiento;