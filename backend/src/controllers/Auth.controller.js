import httpStatus from "http-status";
import AuthService from "../services/Auth.service.js";
import CatchAsync from "../utils/CatchAsync.js";

class AuthController {
    static RegisterUser = CatchAsync(async (req, res) => {
        const res_obj = await AuthService.RegisterUser(req.body);
        res.status(httpStatus.CREATED).json(res_obj);
    });

    static LoginUser = CatchAsync(async (req, res) => {
        const res_obj = await AuthService.LoginUser(req.body);
        res.status(httpStatus.OK).json(res_obj);
    });

    static ProfileController = CatchAsync(async (req, res) => {
        const res_obj = await AuthService.ProfileService(req.user);
        res.status(httpStatus.OK).json(res_obj);
    });
}

export default AuthController;
