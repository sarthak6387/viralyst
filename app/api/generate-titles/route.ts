import { NextResponse }
from "next/server";

import {
  searchVideos,
} from "@/services/youtube.service";

import {
  analyzeTitles,
} from "@/services/title-analyzer.service";

import {
  generateAIResponse,
} from "@/services/gemini.service";

export async function POST(
  req: Request
) {

  try {

    const body =
      await req.json();

    const {

      keyword,

      niche,

      creatorType,

      goal,

    } = body;

    /* FETCH VIDEOS */

    const videos =
      await searchVideos(
        keyword
      );

    /* EXTRACT TITLES */

    const titles =
      videos
        .map(
          (video: any) =>
            video?.snippet?.title
        )
        .filter(Boolean);

    console.log(
      "Fetched Titles:",
      titles
    );

    /* ANALYZE PATTERNS */

    const patterns =
      analyzeTitles(
        titles
      );

    /* PERSONALIZED PROMPT */

    const prompt = `

You are Viralyst AI.

You are an elite
YouTube strategist.

Creator Profile:

Niche:
${niche}

Creator Type:
${creatorType}

Creator Goal:
${goal}

Topic:
${keyword}

Real Viral Titles:
${titles.join("\n")}

Detected Viral Patterns:

- Numbers Used:
${patterns.numbers}

- Questions Used:
${patterns.questions}

- Emotional Hooks:
${patterns.emotionalWords.join(", ")}

TASK:

Generate 10 HIGH CTR
YouTube titles.

Requirements:

- Highly clickable
- Curiosity driven
- Emotional
- Viral optimized
- Modern creator style
- Optimized for retention
- Optimized for CTR
- Personalized to creator profile

Also:

- Use emotional triggers
- Use power words
- Use viral psychology
- Use curiosity gaps

Output ONLY titles.
`;

    /* AI GENERATION */

    const aiTitles =
      await generateAIResponse(
        prompt
      );

    return NextResponse.json({

      success: true,

      sourceTitles:
        titles,

      patterns,

      generatedTitles:
        aiTitles,
    });

  } catch (error) {

    console.error(
      "TITLE GENERATOR ERROR:",
      error
    );

    return NextResponse.json(

      {

        success: false,

        error:
          "Title generation failed",
      },

      {
        status: 500,
      }
    );
  }
}