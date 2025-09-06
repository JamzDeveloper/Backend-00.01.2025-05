import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import Animal from "./animal.js";

const Raza = sequelize.define(
  "Raza",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING(100), allowNull: false },
    id_animal: {
      type: DataTypes.INTEGER,
      references: {
        model: Animal,
        key: "id",
      },
    },
  },
  {
    tableName: "razas",
    timestamps: true,
  }
);

Animal.hasMany(Raza, { foreignKey: "id_animal" });
Raza.belongsTo(Animal, { foreignKey: "id_animal" });

export default Raza;