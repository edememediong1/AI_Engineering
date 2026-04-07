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

const messages = [
    userMessage
]

document.getElementById("generate-btn").addEventListener("click", async () => {
    console.log("Fetching ideas...");
    try {
        const firstResponse = await openai.chat.completions.create({
            model: import.meta.env.VITE_AI_MODEL,
            messages
        });
        // console.log(response);
        console.log(firstResponse.choices[0].message.content);
        // alert("Done! Check your console output.");


        const firstAssistantMessage = firstResponse.choices[0].message
        messages.push(firstAssistantMessage)

        messages.push({
            role: "user",
            content: "More budget friendly. Less than $40"
        })

        // Send second chat completions request
        const secondResponse = await openai.chat.completions.create({
            model: process.env.AI_MODEL,
            messages
        })

        console.log("Budget friendly suggestions")

    } catch (error) {
        console.error("Error fetching ideas:", error);
    }
});