import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser'
import authRouter from './routes/auth/auth.route.js'
const app: Express = express();

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

export default app;
