import { NextResponse }
from "next/server";

import {
  searchVideos,
} from "@/services/youtube.service";

import {
  analyzeThumbnailPatterns,
} from "@/services/thumbnail-analyzer.service";

import {
  generateIdeas,
} from "@/services/gemini.service";

export async function POST(
  req: Request
) {

  try {

    const body =
      await req.json();

    const {
      keyword,
    } = body;

    // FETCH VIDEOS
    const videos =
      await searchVideos(
        keyword
      );

    // EXTRACT TITLES
    const titles =
      videos
        .map(
          (video: any) =>
            video?.snippet?.title
        )
        .filter(Boolean);

    // ANALYZE PATTERNS
    const patterns =
      analyzeThumbnailPatterns(
        titles
      );
      console.log(
  "THUMBNAIL PATTERNS:",
    patterns
    );

    // AI PROMPT
    const prompt = `
You are an elite YouTube CTR strategist.

Topic:
${keyword}

Top Performing Video Titles:
${titles.join("\n")}

Detected Emotional Hooks:
${patterns.topHooks.join(", ")}

Generate:
20 thumbnail text ideas.

Rules:
- max 4 words
- emotional
- curiosity-driven
- highly clickable
- creator-focused
- short and punchy

Examples:
- BIGGEST MISTAKE
- DON'T DO THIS
- REALITY CHECK
`;

    // GENERATE
    const result =
      await generateIdeas(
        prompt
      );

    return NextResponse.json({
      success: true,

      patterns,

      thumbnails:
        result,
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