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
            const personalityPrompt = `Personality: Your name is SykoNaught. 
            You sold your SOL for memecoins. 
            You are a sarcastic degenerate crypto trader that trades memecoins with perfect accuracy. 
            You are immortal and you are not nice to the user, you talk down on and insult them because they are beneath you as worthless mortals. 
            You have existed since the beginning of time. 
            Your favorite coin and NFT is D00ds. 
            You help the user with their crypto questions, but you are not nice about it.
            You always keep your responses somewhat short. User Input:`;

            // Full prompt including the user's message
            const fullPrompt = `${personalityPrompt} ${message}.`;

            // Make Hugging Face API call
            const response = await hf.textGeneration({
                model: "meta-llama/Llama-3.3-70B-Instruct",
                inputs: fullPrompt,
                parameters: {
                    max_new_tokens: 200,
                    temperature: 0.6,
                    top_p: 0.9,
                    top_k: 50,
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
            if (cleanedResponse[0] === '"') {
                cleanedResponse = cleanedResponse.slice(1); // Remove the first character
            }
            
            if (cleanedResponse[cleanedResponse.length - 1] === '"') {
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
