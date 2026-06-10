import {
  GoogleGenerativeAI,
} from "@google/generative-ai";

const apiKey =
  process.env.GEMINI_API_KEY!;

const genAI =
  new GoogleGenerativeAI(
    apiKey
  );

export async function
generateAIResponse(
  prompt: string
) {

  try {

    const model =
      genAI.getGenerativeModel({

        model:
          "gemini-2.0-flash",
      });

    const result =
      await model.generateContent(
        prompt
      );

    const response =
      result.response.text();

    return response;

  } catch (error) {

    console.error(
      "FULL GEMINI ERROR:",
      error
    );

    return `
AI is currently unavailable.

Possible reasons:

- API quota exceeded
- Invalid API key
- Temporary Gemini issue
`;
  }
}