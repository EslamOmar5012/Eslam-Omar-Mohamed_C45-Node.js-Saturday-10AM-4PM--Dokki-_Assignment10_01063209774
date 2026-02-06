import { Router } from "express";
import * as userController from "./user.controller.js";

const router = Router();

router.post("/signup", userController.sinupController);
router.post("/login", userController.loginController);

export default router;
