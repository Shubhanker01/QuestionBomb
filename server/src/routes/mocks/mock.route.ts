import { showScienceMocks, submitMock, getLeaderboard } from "../../controllers/mocks/mock.controller.js";
import { Router } from 'express'
import { verifyJwt } from "../../middlewares/auth.middleware.js";
import { reviewMock } from "../../controllers/mocks/review.controller.js";

const router = Router()

router.route("/science").get(verifyJwt, showScienceMocks)
router.route("/submit/:mockId/:userId").post(submitMock)
router.route("/:mockId/leaderboard").get(getLeaderboard)
router.route("/review/:section/:mockId").get(verifyJwt, reviewMock)

export default router
