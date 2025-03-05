import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.config.js";
import User from "./user.models.js";


const Consumer = sequelize.define("Consumer", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  mobile: { type: DataTypes.STRING, allowNull: false },
  dob: { type: DataTypes.DATE, allowNull: false },
  address: { type: DataTypes.STRING, allowNull: false },
  isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
  userId: { type: DataTypes.UUID, allowNull: false, references: { model: User, key: "id" } },
}, { timestamps: true });

export default Consumer;
