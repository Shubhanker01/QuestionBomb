import Router from 'express'
import { generateAIAnalysis } from '../../controllers/AI analysis/analysis.js'

const router = Router()

router.route(`/:mockId/user/:userId`).post(generateAIAnalysis)

export default router