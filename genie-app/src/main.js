import OpenAI from "openai";
import { marked } from "marked";
import { autoResizeTextarea, checkEnvironment, setLoading, showStream } from "../utils";
import DOMPurify from "dompurify";
checkEnvironment();

// Initialize an OpenAI client for your provider using env vars
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_API_KEY,
  baseURL: import.meta.env.VITE_API_URL,
  dangerouslyAllowBrowser: true,
});

// Get UI elements
const giftForm = document.getElementById("gift-form");
const userInput = document.getElementById("user-input");
const outputContent = document.getElementById("output-content");

function start() {
  // Setup UI event listeners
  userInput.addEventListener("input", () => autoResizeTextarea(userInput));
  giftForm.addEventListener("submit", handleGiftRequest);
}

// Initialize messages array with system prompt
const messages = [
  {
    role: "system",
    content: `You are the Gift Genie!
    Make your gift suggestions thoughtful and practical.
    The user will describe the gift's recipient. 
    Your response must be in structured Markdown.
        Each gift must: 
      - Have a clear heading
      - A short explanation of why it would work

    Skip intros and conclusions. 
    Only output gift suggestions
    
    End with a section with an H2 heading titled "Questions for you" 
    that contains follow-ups that would help improve the 
    gift suggestions`,
  },
];

async function handleGiftRequest(e) {
  // Prevent default form submission
  e.preventDefault();

  // Get user input, trim whitespace, exit if empty
  const userPrompt = userInput.value.trim();
  if (!userPrompt) return;

  // Set loading state
  setLoading(true);

  messages.push({
    role: "user",
    content: userPrompt
  })

  try{
    // Send a chat completions request and await its response
    const stream = await openai.chat.completions.create({
    model: import.meta.env.AI_MODEL,
    messages,
    stream: true
  })

  let giftSuggestions = ""

  // Show output container immediately for streaming feedback
  showStream();

  for await (const chunk of stream) {
    const chunkContent = chunk.choices[0].delta.content
    giftSuggestions += chunkContent
  }


  console.log(giftSuggestions)

  const dirtyGiftSuggestions = marked.parse(giftSuggestions)
  const cleanedGiftSuggestions = DOMPurify.sanitize(dirtyGiftSuggestions)

  outputContent.innerHTML = cleanedGiftSuggestions

  } catch (error) {
    console.error(error)
    outputContent.textContent = "Sorry, an error occured! Try again later"
  } finally{
    // Clear loading state
    setLoading(false);
  }
}

start();
