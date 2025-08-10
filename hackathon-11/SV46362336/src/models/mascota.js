import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import Cliente from "./cliente.js";

const Mascota = sequelize.define(
  "Mascota",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING(100), allowNull: false },
    raza: { type: DataTypes.STRING(50) },
    id_cliente: {
      type: DataTypes.INTEGER,
      references: {
        model: Cliente,
        key: "id",
      },
    },
  },
  {
    tableName: "mascotas",
    timestamps: true,
  }
);

Cliente.hasMany(Mascota, { foreignKey: "id_cliente" });
Mascota.belongsTo(Cliente, { foreignKey: "id_cliente" });

export default Mascota;
