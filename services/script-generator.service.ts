import {
  searchVideos,
} from "./youtube.service";

import {
  generateAIResponse,
} from "./gemini.service";

export async function
generateAIScript(
  topic: string
) {

  // FETCH TRENDING VIDEOS

  const videos =
    await searchVideos(topic);

  // EXTRACT TITLES

  const titles =
    videos.map(
      (video: any) =>
        video.snippet.title
    );

  // AI PROMPT

  const prompt = `
You are an elite YouTube strategist.

Topic:
${topic}

Trending Video Titles:
${titles.join("\n")}

Analyze:
- emotional hooks
- retention strategies
- storytelling patterns
- creator psychology

Generate a HIGH RETENTION
YouTube script.

Structure:

1. Hook
2. Intro
3. Main Talking Points
4. Storytelling Section
5. CTA
6. Outro

Style:
- creator-focused
- emotional
- engaging
- modern
- retention optimized
`;

 const result =
  await generateAIResponse(
    prompt
  );

  return result;
}