import { throwError, hashPassword, comparePassword } from "../../common/index.js";
import { UserModel } from "../../db/index.js";
import * as dbRepository from "../../db/database.repository.js";

export const signup = async (inputs) => {
  // Check if user already exists using repository
  const checkUserExist = await dbRepository.findOne(UserModel, { email: inputs.email });
  if (checkUserExist) {
    throwError("email already exist", 409);
  }

  // Hash password before storing
  const hashedPassword = await hashPassword(inputs.password);
  inputs.password = hashedPassword;

  // Create user using repository
  const user = await dbRepository.create(UserModel, inputs);
  return user;
};

export const login = async (inputs) => {
  // Check if user exists using repository
  const user = await dbRepository.findOne(UserModel, { email: inputs.email });
  if (!user) {
    throwError("Invalid email or password", 404);
  }

  // Verify password
  const isPasswordValid = await comparePassword(inputs.password, user.password);
  if (!isPasswordValid) {
    throwError("Invalid email or password", 401);
  }

  // Return user without password
  const userObject = user.toObject();
  delete userObject.password;
  return userObject;
};
