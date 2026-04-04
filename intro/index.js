import OpenAI from "openai"
import { checkEnvironment } from "./utils"

const openai = new OpenAI({
    apiKey: import.meta.env.VITE_API_KEY,
    baseURL: import.meta.env.VITE_API_URL,
    dangerouslyAllowBrowser: true
})

checkEnvironment();

const userPrompt = "Suggest some gifts for someone who loves hiphop music"

const userMessage = {
    role: "user",
    content: userPrompt
}

document.getElementById("generate-btn").addEventListener("click", async () => {
    console.log("Fetching ideas...");
    try {
        const response = await openai.chat.completions.create({
            model: import.meta.env.VITE_AI_MODEL,
            messages: [ userMessage ]
        });
        console.log(response);
        alert("Done! Check your console output.");
    } catch (error) {
        console.error("Error fetching ideas:", error);
    }
});