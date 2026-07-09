import dotenv from 'dotenv';
import { connectToDB } from './db/connectToDb.js';
import app from './app.js';
// Load environment configurations (.env)
dotenv.config();

const PORT = process.env.PORT || 8000;

// Start the Server Execution
app.listen(PORT, () => {
    console.log(`⚡[server]: QuestionBomb backend running at http://localhost:${PORT}`);
});

connectToDB()