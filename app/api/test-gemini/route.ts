import { NextResponse }
  from "next/server";

import {
  generateIdeas,
} from "@/services/gemini.service";

export async function GET() {

  const result =
    await generateIdeas(
      "Generate 5 viral coding titles"
    );

  return NextResponse.json({
    result,
  });
}