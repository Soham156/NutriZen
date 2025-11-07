import { Request, Response, NextFunction } from 'express';
import { geminiModel, NUTRITION_SYSTEM_PROMPT } from '../config/gemini.js';
import { AppError } from '../middleware/errorHandler.js';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export const sendMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { message, conversationHistory } = req.body;

    if (!message || typeof message !== 'string') {
      res.status(400).json({ error: 'Message is required and must be a string' });
      return;
    }

    if (!process.env.GEMINI_API_KEY) {
      throw new AppError('Gemini API key not configured', 500);
    }

    // Build conversation context
    let prompt = NUTRITION_SYSTEM_PROMPT + '\n\n';
    
    // Add conversation history if provided
    if (conversationHistory && Array.isArray(conversationHistory)) {
      conversationHistory.forEach((msg: ChatMessage) => {
        if (msg.role === 'user') {
          prompt += `User: ${msg.content}\n`;
        } else if (msg.role === 'assistant') {
          prompt += `Assistant: ${msg.content}\n`;
        }
      });
    }
    
    // Add current message
    prompt += `User: ${message}\nAssistant:`;

    // Generate response using Gemini
    const result = await geminiModel.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    res.json({
      success: true,
      data: { 
        response: text,
        model: 'gemini-2.0-flash-exp'
      },
    });
  } catch (error: any) {
    console.error('Chat error:', error);
    
    if (error.message?.includes('API key')) {
      next(new AppError('AI service configuration error', 500));
    } else {
      next(error);
    }
  }
};
