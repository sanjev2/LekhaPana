import Profile from "./profile.model.js";
import Consumer from "./consumer.model.js";
import Order from "./order.model.js";
import User from "./user.models.js";

const models = { User, Profile, Consumer, Order };

export const initializeModels = () => {
  User.hasOne(Profile, { foreignKey: "userId" });
  Profile.belongsTo(User, { foreignKey: "userId" });

  User.hasMany(Consumer, { foreignKey: "userId" });
  Consumer.belongsTo(User, { foreignKey: "userId" });

  User.hasMany(Order, { foreignKey: "userId" });
  Order.belongsTo(User, { foreignKey: "userId" });

  Consumer.hasMany(Order, { foreignKey: "consumerId" });
  Order.belongsTo(Consumer, { foreignKey: "consumerId" });
};

export default models;
