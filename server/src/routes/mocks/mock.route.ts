import { showScienceMocks } from "../../controllers/mocks/mock.controller.js";
import { Router } from 'express'
import { verifyJwt } from "../../middlewares/auth.middleware.js";

const router = Router()

router.route("/science").get(verifyJwt, showScienceMocks)
export default router
