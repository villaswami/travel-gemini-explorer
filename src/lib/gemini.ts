
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyCb_iS5ZMmH8M6_qMwpIUQ_w4PiSw_WjjU";
const MODEL_NAME = "gemini-pro";

export type GeminiMessage = {
  role: "user" | "model";
  content: string;
};

export async function getGeminiResponse(
  prompt: string,
  history: GeminiMessage[] = []
): Promise<string> {
  try {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    // Fix to ensure first message is always user
    let formattedHistory = [...history];
    
    // If first message is from model, remove it from history and handle separately
    if (formattedHistory.length > 0 && formattedHistory[0].role === "model") {
      formattedHistory = [];
    }
    
    // Format history properly for Gemini API
    const chatHistory = formattedHistory.map((msg) => ({
      role: msg.role,
      parts: [{ text: msg.content }],
    }));

    // Start fresh chat or with history
    const chat = model.startChat({
      history: chatHistory.length > 0 ? chatHistory : undefined,
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.7,
      },
    });

    const result = await chat.sendMessage(prompt);
    const response = result.response;
    return response.text();
  } catch (error) {
    console.error("Error with Gemini AI:", error);
    return "I'm having trouble connecting to my knowledge base at the moment. Please try again later.";
  }
}

// Travel specific prompt templates
export const travelPrompts = {
  destinationInfo: (destination: string) => 
    `Tell me about ${destination} as a travel destination. Include key attractions, best time to visit, and travel tips.`,
  
  itinerarySuggestion: (destination: string, days: number) => 
    `Create a ${days}-day itinerary for ${destination} with day-by-day activities and sights.`,
  
  budgetEstimate: (destination: string, days: number, style: string) => 
    `Estimate a ${style} budget for a ${days}-day trip to ${destination}. Include accommodation, food, transportation, and activities.`,
  
  packingList: (destination: string, season: string, days: number) => 
    `Create a packing list for a ${days}-day trip to ${destination} during ${season}.`,
  
  localCuisine: (destination: string) => 
    `What are the must-try local foods and restaurants in ${destination}?`,
  
  transportationAdvice: (origin: string, destination: string) => 
    `What's the best way to travel from ${origin} to ${destination}? Compare options like flights, trains, buses, and driving.`
};
