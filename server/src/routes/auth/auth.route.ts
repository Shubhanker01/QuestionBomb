import { Router } from "express";
import { googleAuth } from "../../controllers/auth/auth.controller.js";

const router = Router()

router.route("/").post(googleAuth)
export default router