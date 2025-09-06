import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import Cita from "./cita.js";

const Tratamiento = sequelize.define(
  "Tratamiento",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING(100), allowNull: false },
    descripcion: { type: DataTypes.TEXT, allowNull: false },
    fecha_inicio: { type: DataTypes.DATEONLY, allowNull: false },
    fecha_fin: { type: DataTypes.DATEONLY, allowNull: false },
    costo: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    notas: { type: DataTypes.TEXT, allowNull: true },
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
Tratamiento.belongsTo(Cita, { foreignKey: "id_cita" });

export default Tratamiento;