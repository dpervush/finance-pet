import Router from "express";
import { body } from "express-validator";
import authMiddleware from "../middlewares/authMiddleware.js";

import UserController from "./UserController.js";

const router = new Router();

router.post(
  "/register",
  body("email").isEmail(),
  body("password").isLength({ min: 8, max: 32 }),
  UserController.register
);
router.post("/login", UserController.login);
router.post("/logout", UserController.logout);
router.get("/activate/:link", UserController.activate);
router.get("/refresh", UserController.refresh);
router.get("/me", authMiddleware, UserController.getMe);

export default router;
