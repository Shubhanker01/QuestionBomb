import { Router } from "express";
import { googleAuth, logoutUser } from "../../controllers/auth/auth.controller.js";
import { verifyJwt } from "../../middlewares/auth.middleware.js";

const router = Router()

router.route("/").post(googleAuth)
router.route("/logout").post(verifyJwt, logoutUser)

export default router