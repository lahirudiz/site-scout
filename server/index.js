import dotenv from "dotenv";
dotenv.config();
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

(async () => {
  try {
    const response = await client.chat.completions.create({
      model: "gpt-4.1",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: "Write a name that starts with A" }
      ]
    });
    console.log(response.choices[0].message.content);
  } catch (err) {
    console.error("OpenAI API error:", err);
  }
})();
