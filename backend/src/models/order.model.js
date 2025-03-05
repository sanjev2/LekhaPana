import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.config.js";
import Consumer from "./consumer.model.js";
import User from "./user.models.js";

const Order = sequelize.define("Order", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  items: { type: DataTypes.JSONB, defaultValue: [] },
  isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
  userId: { type: DataTypes.UUID, allowNull: false, references: { model: User, key: "id" } },
  consumerId: { type: DataTypes.UUID, allowNull: false, references: { model: Consumer, key: "id" } },
}, { timestamps: true });

export default Order;
