import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser'
import authRouter from './routes/auth/auth.route.js'
import mockRouter from './routes/mocks/mock.route.js'
import questionRouter from './routes/questions/question.route.js'
import paymentRouter from './routes/payment/payment.route.js'
import analysisRouter from './routes/analysis/analysis.route.js'

const app: Express = express();
app.set('trust proxy', 1)

app.use(cors({
    origin: ["http://localhost:5173", process.env.CLIENT_URL as string],
    credentials: true
}));
app.use(express.json());
app.use(cookieParser())

// Global Base Health Check Route
app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({ status: "QuestionBomb engine online" });
});

app.use("/api/v1/auth", authRouter)
app.use("/api/v1/mocks", mockRouter)
app.use("/api/v1/questions", questionRouter)
app.use('/api/v1/payment', paymentRouter)
app.use('/api/v1/ai-analysis', analysisRouter)

export default app;
