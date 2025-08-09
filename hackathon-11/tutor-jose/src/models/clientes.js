import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const Cliente = sequelize.define(
  "Cliente",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING(100), allowNull: false },
    telefono: { type: DataTypes.STRING(11), allowNull: true },
  },
  {
    tableName: "clientes",
    timestamps: true,
  }
);


export default Cliente;
