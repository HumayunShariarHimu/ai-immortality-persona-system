// First, you need to set your IBM Watson NLU API Key and Endpoint
const API_KEY = 'your_api_key_here';
const API_URL = 'https://api.us-south.natural-language-understanding.watson.cloud.ibm.com/instances/your-instance-id/v1/analyze?version=2022-04-07';

// Text input to analyze
const textInput = "I am really happy today!";

// Configuration for analysis
const nluParams = {
    'text': textInput,
    'features': {
        'sentiment': {},        // Sentiment analysis
        'emotion': {},          // Emotion analysis
        'entities': {           // Entity analysis
            'emotion': true
        },
        'keywords': {}          // Keyword analysis
    }
};

// Using Fetch API to call IBM Watson NLU API
async function analyzeText() {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + btoa('apikey:' + API_KEY)  // Authorization header
        },
        body: JSON.stringify(nluParams)
    });

    const data = await response.json();
    console.log('NLU Response:', data);

    // Display analysis results
    if (data.sentiment) {
        console.log('Sentiment:', data.sentiment.document.label);
    }
    if (data.emotion) {
        console.log('Emotion:', data.emotion.document.emotion);
    }
}

analyzeText();