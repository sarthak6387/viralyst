import { NextResponse }
from "next/server";

import {
  generateAIResponse,
} from "@/services/gemini.service";

export async function POST(
  request: Request
) {

  try {

    const {
      prompt,
    } = await request.json();

    const response =
  await generateAIResponse(
        `
You are Viralyst AI.

You are an expert
YouTube strategist.

Help creators grow faster.

Prompt:
${prompt}
        `
      );

    return NextResponse.json({

      success: true,

      response,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        response:
          "AI failed to respond.",
      },
      {
        status: 500,
      }
    );
  }
}