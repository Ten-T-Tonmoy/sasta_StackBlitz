import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

import { simpleCors } from "./config/cors.js";
import { aiApiOutput } from "./controllers/aiApi.controller.js";
import { codeExecution } from "./controllers/codeExecution.controller.js";

//usin shitshows
const app = express();
app.use(cors(simpleCors));
app.use(express.json());

const API_URL = "https://openrouter.ai/api/v1/chat/completions";
const API_KEY = process.env.OPENROUTER_KEY;
const PORT = 3000 || process.env.PORT;

//route shits
app.post("/api/chat", aiApiOutput);
app.post("/execute", codeExecution);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
