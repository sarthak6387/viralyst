import { NextResponse }
  from "next/server";

import {
  generateAIResponse,
} from "@/services/gemini.service";

export async function GET() {

  const result =
    await generateAIResponse(
      "Generate 5 viral coding titles"
    );

  return NextResponse.json({
    result,
  });
}