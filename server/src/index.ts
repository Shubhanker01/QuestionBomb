import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment configurations (.env)
dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 8000; // Defaulting to 8080 matches Google Cloud Run's requirements

// Standard Middleware
app.use(cors());
app.use(express.json());

// Global Base Health Check Route
app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({ status: "QuestionBomb engine online" });
});

// Start the Server Execution
app.listen(PORT, () => {
    console.log(`⚡[server]: QuestionBomb backend running at http://localhost:${PORT}`);
});