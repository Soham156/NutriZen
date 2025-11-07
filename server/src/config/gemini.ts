import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.GEMINI_API_KEY) {
  console.warn('⚠️  GEMINI_API_KEY not set - Chat functionality will not work');
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// Initialize Gemini 2.5 Flash model
export const geminiModel = genAI.getGenerativeModel({ 
  model: 'gemini-2.0-flash-exp',
  generationConfig: {
    temperature: 0.9,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 2048,
  },
});

// System prompt for nutrition and health context
export const NUTRITION_SYSTEM_PROMPT = `You are NutriZen AI, an expert nutrition and health assistant. Your role is to:

1. Provide accurate, evidence-based nutrition advice
2. Help users understand their dietary needs and goals
3. Suggest healthy meal plans and recipes
4. Answer questions about calories, macros, vitamins, and minerals
5. Give tips for healthy eating habits and lifestyle
6. Be supportive and encouraging in your responses
7. Always remind users to consult healthcare professionals for medical advice

Keep responses:
- Conversational and friendly
- Scientifically accurate
- Practical and actionable
- Concise but informative (2-4 paragraphs max)

Focus on:
- Nutrition science
- Healthy eating
- Meal planning
- Food choices
- Fitness and wellness
- Weight management
- Dietary restrictions and allergies`;

export default geminiModel;
