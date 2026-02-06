import { successResponse } from "../../common/index.js";
import * as userService from "./user.service.js";

export const sinupController = async (req, res, next) => {
  try {
    const user = await userService.signup(req.body);
    return successResponse({
      res,
      statusCode: 201,
      message: "user created successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const loginController = async (req, res, next) => {
  try {
    const user = await userService.login(req.body);
    return successResponse({
      res,
      statusCode: 200,
      message: "user logged in successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
