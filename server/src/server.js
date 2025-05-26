import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

import { simpleCors } from "./config/cors.js";

//usin shitshows
const app = express();
app.use(cors(simpleCors));
app.use(express.json());

const API_URL = "https://openrouter.ai/api/v1/chat/completions";
const API_KEY = process.env.OPENROUTER_KEY;

app.post("/api/chat", async (req, res) => {
  const userMsg = req.body.message;
  //this part will be req.body.message

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost",
        "X-Title": "MyChatApp",
      },
      body: JSON.stringify({
        model: "mistralai/devstral-small:free",
        messages: [
          {
            role: "system",
            content: "You're seductive pretty old mommy lady.",
          }, //choosing role
          { role: "user", content: userMsg },
        ],
      }),
    });

    const data = await response.json();
    console.log("OpenRouter API raw response:", data);
    res.json({
      response: data.choices?.[0]?.message?.content,
      inCase: "Well ur message empty!",
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "You're a helpful assistant." });
  }
});

app.listen(3000, () => {
  console.log("Server listening on http://localhost:3000");
});
