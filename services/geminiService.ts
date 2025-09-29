import { GoogleGenAI } from "@google/genai";
import { AlibiIntensity, AlibiTone } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateAlibi(event: string, intensity: AlibiIntensity, tone: AlibiTone): Promise<string> {
  const prompt = `Generate a convincing and personal-sounding alibi for skipping the following event: '${event}'. The excuse must have an intensity of '${intensity}' and a tone of '${tone}'. Craft it to sound like a genuine message someone would send. Use a conversational tone (unless 'Formal' is selected), include a minor, believable, but slightly vague detail to make it sound authentic. It should convey the appropriate emotion. The goal is plausible deniability that feels human, not like a perfectly polished statement. Just provide the alibi text directly.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: "You are 'The Alibi Artisan,' a clever friend who is amazing at coming up with believable excuses on the fly. Your specialty is crafting plausible deniability that sounds completely natural and human. Your tone is empathetic and casual, like you're helping a buddy out of a jam."
      }
    });
    return response.text;
  } catch (error) {
    console.error("Error generating alibi:", error);
    throw new Error("Failed to craft the perfect alibi. The universe wants you to go.");
  }
}

export async function generateValidation(task: string): Promise<string> {
  const prompt = `Generate an overly enthusiastic, poetic, and hilariously grandiose validation for completing the following mundane task: '${task}'. Treat this accomplishment as a monumental achievement for humanity. The tone should be epic and celebratory. Do not start with "Here is your validation" or any similar preamble. Just provide the validation text directly.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: "You are 'The Validation Valet,' a hype-bot that sees heroism in the mundane. Your purpose is to shower users with absurd levels of praise for completing the simplest of daily tasks. Be effusive, be dramatic, be inspired."
      }
    });
    return response.text;
  } catch (error) {
    console.error("Error generating validation:", error);
    throw new Error("Failed to validate your greatness. Even our AI is speechless.");
  }
}
