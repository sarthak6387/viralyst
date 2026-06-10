import { NextResponse }
  from "next/server";

import {
  analyzeTrend,
} from "@/services/trend-engine.service";

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
      niche,
      audience,
      style,
    } = body;

    const trendAnalysis =
      await analyzeTrend(niche);

    const topTitles =
      trendAnalysis.analyzedVideos
        .map(
          (video: any) =>
            video.snippet.title
        )
        .join("\n");

    const prompt = `
You are an elite YouTube strategist.

Trend Topic:
${niche}

Audience:
${audience}

Content Style:
${style}

Trending Video Titles:
${topTitles}

Growth Score:
${trendAnalysis.growthScore}

Analyze:
- emotional hooks
- curiosity patterns
- high CTR structures
- storytelling styles

Generate:
1. Viral Titles
2. Hooks
3. Thumbnail Text
4. Short Descriptions

Make the content:
- creator focused
- emotional
- modern
- highly clickable
`;

    const aiResponse =
      await generateAIResponse(prompt);

    return NextResponse.json({
      success: true,

      trendData:
        trendAnalysis,

      content:
        aiResponse,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}