import express from "express";
import {
  createCurrentUser,
  getCurrentUser,
  updateCurrentUser,
} from "../controller/User.controller";
import { jwtCheck, jwtParse } from "../middleware/auth";
import { validateMyUserRequest } from "../middleware/validation";

const router = express.Router();

router.post("/", jwtCheck, createCurrentUser);
router.post(
  "/update",
  jwtCheck,
  jwtParse,
  validateMyUserRequest,
  updateCurrentUser
);
router.get("/current", jwtCheck, jwtParse, getCurrentUser);

export default router;
