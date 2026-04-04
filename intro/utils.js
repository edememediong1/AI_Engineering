export function checkEnvironment(){
    if (!import.meta.env.VITE_API_URL) {
        throw new Error("Misssing AI_URL. This tells us which AI provider you're using.");
    }
    if (!import.meta.env.VITE_AI_MODEL) {
        throw new Error("Missing AI_MODEL. The AI request needs a model name")
    }
    if (!import.meta.env.VITE_API_KEY){
        throw new Error("Missing AI_KEY. Your API Key is not being picked up.")
    }

    console.log("AI provider URL:", import.meta.env.VITE_API_URL);
    console.log("AI model", import.meta.env.VITE_AI_MODEL)
}