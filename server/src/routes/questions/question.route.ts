import Router from 'express'
import { fetchQuestions } from '../../controllers/questions/question.controller.js'
import { verifyJwt } from '../../middlewares/auth.middleware.js'

const router = Router()
router.route("/:section/:mockId").get(verifyJwt, fetchQuestions)


export default router