import Router from 'express'
import { generateAIAnalysis } from '../../controllers/AI analysis/analysis.js'

const router = Router()

router.route(`/:mockId`).post(generateAIAnalysis)

export default router