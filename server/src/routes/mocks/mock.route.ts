import { showScienceMocks, submitMock, getLeaderboard } from "../../controllers/mocks/mock.controller.js";
import { Router } from 'express'
import { verifyJwt } from "../../middlewares/auth.middleware.js";

const router = Router()

router.route("/science").get(verifyJwt, showScienceMocks)
router.route("/submit/:mockId/:userId").post(submitMock)
router.route("/:mockId/leaderboard").get(getLeaderboard)

export default router
