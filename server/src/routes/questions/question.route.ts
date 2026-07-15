import Router from 'express'
import { fetchQuestions } from '../../controllers/questions/question.controller.js'

const router = Router()
router.route("/:section/:mockId").get(fetchQuestions)


export default router