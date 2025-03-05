import httpStatus from "http-status";
import { Op } from "sequelize";
import models from "../models/index.js";
import ApiError from "../utils/ApiError.js";

class ConsumerService {
  static async RegisterConsumer(userId, body) {
    const { name, email, mobile, dob, address } = body;
    const checkExist = await models.Consumer.findOne({
      where: { email, userId },
    });
    if (checkExist) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Consumer Already in Record");
    }
    await models.Consumer.create({ name, email, mobile, dob, address, userId });
    return { msg: "Consumer Added :)" };
  }

  static async DeleteConsumer(userId, id) {
    const checkExist = await models.Consumer.findOne({
      where: { id, userId },
    });
    if (!checkExist) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Consumer Not Found in Record");
    }
    // Delete associated orders
    await models.Order.destroy({ where: { consumerId: id } });
    // Delete consumer
    await checkExist.destroy();
    return { msg: "Consumer Deleted :)" };
  }

  static async getById(userId, id) {
    const checkExist = await models.Consumer.findOne({
      where: { id, userId },
    });
    if (!checkExist) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Consumer Not Found in Record");
    }
    return { user: checkExist };
  }

  static async GetAllUser(userId, page = 1, query = "") {
    const limit = 10;
    const offset = (Number(page) - 1) * limit;
    const queryOptions = {
      where: {
        userId,
        [Op.or]: [
          { name: { [Op.iLike]: `%${query}%` } },
          { email: { [Op.iLike]: `%${query}%` } },
          { address: { [Op.iLike]: `%${query}%` } },
          { mobile: { [Op.iLike]: `%${query}%` } },
        ],
      },
      attributes: ["id", "name", "email", "mobile"],
      limit,
      offset,
    };
    const { count, rows: data } = await models.Consumer.findAndCountAll(queryOptions);
    const hasMore = offset + limit < count;
    return { users: data, more: hasMore };
  }

  static async updateById(userId, body, id) {
    const { name, email, mobile, dob, address } = body;
    const checkExist = await models.Consumer.findByPk(id);
    if (!checkExist) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Consumer Not Found");
    }
    if (checkExist.email !== email) {
      const checkExistEmail = await models.Consumer.findOne({
        where: {
          email,
          userId,
          id: { [Op.ne]: id },
        },
      });
      if (checkExistEmail) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Consumer Email Already in Another Record");
      }
    }
    await models.Consumer.update(
      { name, email, mobile, dob, address },
      { where: { id } }
    );
    return { msg: "Consumer Updated :)" };
  }

  static async GetUserForSearch(userId) {
    const data = await models.Consumer.findAll({
      where: { userId },
      attributes: ["id", "name", "dob"],
    });
    return { users: data };
  }

  static async DashboardData(userId) {
    const consumers = await models.Consumer.count({ where: { userId } });
    const orders = await models.Order.findAll({
      where: { userId },
      attributes: ["items"],
    });
    const prices = orders.flatMap(order => (order.items || []).map(item => item.price || 0));
    const totalSales = prices.length > 0 ? prices.reduce((a, c) => a + c, 0) : 0;
    return { consumers, orders: orders.length, sell: totalSales };
  }
}

export default ConsumerService;
