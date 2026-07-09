import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import authRouter from './routes/auth/auth.route.js'
const app: Express = express();

app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true
}));
app.use(express.json());

// Global Base Health Check Route
app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({ status: "QuestionBomb engine online" });
});

app.use("/api/v1/auth", authRouter)

export default app;
