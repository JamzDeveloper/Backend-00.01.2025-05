import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import Animal from "./animal.js";
import Raza from "./raza.js";
import Cliente from "./cliente.js";

const Mascota = sequelize.define(
  "Mascota",
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
    id_raza: {
      type: DataTypes.INTEGER,
      references: {
        model: Raza,
        key: "id",
      },
    },
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

Animal.hasOne(Mascota, { foreignKey: "id_animal" });
Mascota.belongsTo(Animal, { foreignKey: "id_animal" });

Raza.hasOne(Mascota, { foreignKey: "id_raza" });
Mascota.belongsTo(Raza, { foreignKey: "id_raza" });

Cliente.hasMany(Mascota, { foreignKey: "id_cliente" });
Mascota.belongsTo(Cliente, { foreignKey: "id_cliente" });

export default Mascota;