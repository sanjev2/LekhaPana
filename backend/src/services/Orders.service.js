import models from "../models/index.js"; // Ensure models is imported correctly
import ApiError from "../utils/ApiError.js";
import httpStatus from "http-status";
import { Op } from "sequelize";

class OrderService {
    static async createOrder(userId, body) {
        await models.Order.create({
            userId,
            consumerId: body.user,
            items: body.items
        });

        return {
            msg: "Order Created Successfully"
        };
    }

    static async getAllorders(userId, page = 1, query) {
        const limit = 10;
        const offset = (Number(page) - 1) * limit;

        const queryOptions = {
            where: {
                userId,
                ...(query && {
                    items: {
                        [Op.contains]: [{ name: { [Op.iLike]: `%${query}%` } }]
                    }
                })
            },
            include: [{
                model: models.Consumer, // Reference to models.Consumer
                attributes: ['name', 'email']
            }],
            order: [['createdAt', 'DESC']],
            limit,
            offset
        };

        const { count, rows: data } = await models.Order.findAndCountAll(queryOptions);

        const hasMore = offset + limit < count;

        return {
            data,
            hasMore
        };
    }

    static async deleteOrder(userId, id) {
        const existOrder = await models.Order.findOne({
            where: {
                userId,
                id
            }
        });

        if (!existOrder) {
            throw new ApiError(httpStatus.NOT_FOUND, "Order Not Found");
        }

        await existOrder.destroy();

        return {
            msg: 'Order Deleted Successfully'
        };
    }

    static async getInvoiceById(userId, id) {
        const order = await models.Order.findOne({
            where: {
                userId,
                id
            },
            attributes: ['items', 'createdAt'],
            include: [
                {
                    model: models.Consumer, // Reference to models.Consumer
                    attributes: ['name', 'email', 'address']
                },
                {
                    model: models.User, // Reference to models.User
                    attributes: ['name']
                }
            ]
        });

        if (!order) {
            throw new ApiError(httpStatus.NOT_FOUND, "Order Not Found");
        }

        return order;
    }
}

export default OrderService;
