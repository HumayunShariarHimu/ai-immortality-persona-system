class AI_Persona {
    constructor(memoryData, gptAPIKey) {
        this.memoryData = memoryData; // Stored memory data (JSON)
        this.gptAPIKey = gptAPIKey; // GPT API Key
    }

    // 1. Function to analyze user input for NLU
    analyzeInput(userInput) {
        userInput = userInput.toLowerCase();
        let relevantData = this.memoryData.filter(item =>
            item.keywords.some(keyword => userInput.includes(keyword.toLowerCase()))
        );
        return relevantData.length > 0 ? relevantData : null;
    }

    // 2. Generate response based on AI Persona or GPT if not found in memory
    async generateResponse(userInput) {
        let matchedData = this.analyzeInput(userInput);

        if (matchedData) {
            let response = matchedData.map(item => item.response).join(" ");
            return this.personalityBasedResponse(response);
        } else {
            return await this.fetchGPTResponse(userInput);
        }
    }

    // 3. Generate response based on AI Persona personality
    personalityBasedResponse(text) {
        return `🤖 [AI Persona]: ${text}`;
    }

    // 4. If no match in memory, call GPT to fetch response
    async fetchGPTResponse(query) {
        let apiUrl = "https://api.openai.com/v1/chat/completions";
        let payload = {
            model: "gpt-4",
            messages: [{ role: "system", content: "You are an AI persona with a unique mindset." },
                       { role: "user", content: query }]
        };

        let response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.gptAPIKey}`
            },
            body: JSON.stringify(payload)
        });

        let data = await response.json();
        return data.choices[0].message.content;
    }
}

// **Test Data (JSON)**
let storedMemory = [
    { keywords: ["who are you", "your name"], response: "I am an AI Persona created based on your memories." },
    { keywords: ["what can you do", "your abilities"], response: "I can preserve your memories and provide relevant responses." }
];

// **Initialize AI Persona**
let aiPersona = new AI_Persona(storedMemory, "YOUR_GPT_API_KEY");

// **Test the AI**
async function testAI() {
    let userQuery = "Who are you?";
    let response = await aiPersona.generateResponse(userQuery);
    console.log(response);
}

testAI();