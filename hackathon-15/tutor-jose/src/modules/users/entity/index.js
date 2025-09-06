import { DataTypes } from "sequelize";
import { sequelize } from "../../../config/db.js";

const UserModel = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING },
    username: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    role: { type: DataTypes.STRING },
  },
  {
    timestamps: true,
  }
);

export { UserModel };
