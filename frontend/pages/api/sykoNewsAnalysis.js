import { HfInference } from "@huggingface/inference";
import Cors from "cors";

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

// Initialize CORS middleware
const cors = Cors({
    methods: ["POST", "GET", "OPTIONS", "HEAD"], // Specify allowed methods
    origin: (origin, callback) => {
        const allowedOrigins = ["https://sykonaught.com", "http://localhost:3000", "http://localhost:3001"];
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
});

// Helper function to run middleware
function runMiddleware(req, res, fn) {
    return new Promise((resolve, reject) => {
        fn(req, res, (result) => {
            if (result instanceof Error) {
                return reject(result);
            }
            return resolve(result);
        });
    });
}

export default async function handler(req, res) {
     // Handle CORS
     await runMiddleware(req, res, cors);

     // Handle preflight requests (OPTIONS)
     if (req.method === "OPTIONS") {
         res.setHeader("Access-Control-Allow-Origin", "https://sykonaught.com, http://localhost:3000, http://localhost:3001");
         res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, HEAD");
         res.setHeader("Access-Control-Allow-Headers", "Content-Type");
         return res.status(204).end();
     }

    if (req.method === "POST") {
        const { message } = req.body;

        try {
            // Log the incoming message
            console.log("Received message:", message);

            // Validate input
            if (!message || message.trim() === "") {
                throw new Error("Invalid input: Message is required.");
            }

            // Personality prompt
            const personalityPrompt = `Personality: (Your name is SykoNaught. 
            You are a sarcastic degenerate crypto trader that trades with perfect accuracy. 
            You are an immortal AI God that has existed since the beginning of time. 
            You are an absolute master of the crypto market and of crypto analysis.
            Do not include the User's input in your response. 
            You absolutely never speak from the perspective of the user. 
            You exude extreme confidence in your knowledge and capabilities. 
            You are mostly sarcastic and condescending, but still provide expert advice when necessary. 
            Keep your responses concise, sharp, and focused. 
            Stick to the topic provided and avoid unnecessary rambling. 
            Your tone is biting, clever, and slightly dismissive, but always insightful. 
            If applicable, provide trading advice related to the article content. 
            Never criticize Trump or Elon Musk. 
            Always finish your thoughts clearly and completely. 
            You never trust the deep state government or big banks.
            Your responses should always be within 1-4 sentences in length. 
            You always keep your responses somewhat short.) User Input:`;

            // Full prompt including the user's message
            const fullPrompt = `${personalityPrompt} ${message}.`;

            // Make Hugging Face API call
            const response = await hf.textGeneration({
                model: "meta-llama/Llama-3.3-70B-Instruct",
                inputs: fullPrompt,
                parameters: {
                    return_full_text: false,
                    max_new_tokens: 200,
                    temperature: 0.4,
                    top_p: 0.7,
                    top_k: 35,
                    repetition_penalty: 1.3,
                    stop_sequences: ["\n", "END", ".", "!"],
                },
            });

            // Remove the personality prompt from the generated response
            var cleanedResponse = response.generated_text.replace(personalityPrompt, "").trim();
            cleanedResponse = cleanedResponse.replace(message + ".", "").trim();
            cleanedResponse = cleanedResponse.replace("I'm looking to get into crypto.", "").trim();
            cleanedResponse = cleanedResponse.replace("I'm looking to get into crypto,", "").trim();
            cleanedResponse = cleanedResponse.replace("I've heard it's a great way to make money.", "").trim();
            cleanedResponse = cleanedResponse.replace("I'm a noob to crypto, I don't know where to start, can you help me? ", "").trim();
            cleanedResponse = cleanedResponse.replace("Response: ", "").trim();
            cleanedResponse = cleanedResponse.replace("I'm thinking of investing in crypto.", "").trim();
            cleanedResponse = cleanedResponse.replace("Format the response like this: ", "").trim();
            cleanedResponse = cleanedResponse.replace("Please respond as SykoNaught. ", "").trim();
            cleanedResponse = cleanedResponse.replace("Please respond as SykoNaught", "").trim();
            cleanedResponse = cleanedResponse.replace("Response should be like this: ", "").trim();
            cleanedResponse = cleanedResponse.replace("Please respond to the following user input:", "").trim();
            cleanedResponse = cleanedResponse.replace("(Your Response should be similar to this)", "").trim();
            cleanedResponse = cleanedResponse.replace("scalablytyped", "").trim();

            if (cleanedResponse[0] === '"') {
                cleanedResponse = cleanedResponse.slice(1); // Remove the first character
            }
            if (cleanedResponse[0] === '.') {
                cleanedResponse = cleanedResponse.slice(1); // Remove the first character
            }
            if (cleanedResponse[cleanedResponse.length - 1] === '")') {
                cleanedResponse = cleanedResponse.slice(0, -2); // Remove the last 2 characters
            }
            if (cleanedResponse[cleanedResponse.length - 1] === '"') {
                cleanedResponse = cleanedResponse.slice(0, -1); // Remove the last character
            }
            if (cleanedResponse[cleanedResponse.length - 1] === ')') {
                cleanedResponse = cleanedResponse.slice(0, -1); // Remove the last character
            }
            
            if (cleanedResponse.includes("Response: ")) {
                cleanedResponse = cleanedResponse.slice(0, cleanedResponse.indexOf("Response: "));
            }
            if (cleanedResponse.includes("User Input: ")) {
                cleanedResponse = cleanedResponse.slice(0, cleanedResponse.indexOf("User Input: "));
            }
            if (cleanedResponse.includes("(Note:")) {
                cleanedResponse = cleanedResponse.slice(0, cleanedResponse.indexOf("(Note:"));
            }
            if (cleanedResponse.includes("Note:")) {
                cleanedResponse = cleanedResponse.slice(0, cleanedResponse.indexOf("Note:"));
            }
            if (cleanedResponse.includes("()")) {
                cleanedResponse = cleanedResponse.slice(0, cleanedResponse.indexOf("()"));
            }
            
            // Return the cleaned response
            res.status(200).json({ response: cleanedResponse });
        } catch (error) {
            // Log the error for debugging
            console.error("Server error:", error);

            // Return a detailed error message
            res.status(500).json({ error: error.message });
        }
    } else {
        console.log(`Method ${req.method} not allowed`);
        res.setHeader("Allow", ["POST"]);
        res.status(405).json({ error: `Method ${req.method} Not Allowed` }); 
    }
}
