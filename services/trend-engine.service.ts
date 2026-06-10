import {
  getTrendData,
} from "./google-trends.service";

import {
  searchVideos,
} from "./youtube.service";

import {
  calculateGrowthScore,
  calculateEngagementScore,
  calculateViralScore,
} from "./scoring.service";

import {
  trendCache,
} from "./cache.service";

interface AnalyzedVideo {
  id: string;

  title: string;

  description: string;

  thumbnail: string;

  channel: string;

  publishedAt: string;

  views: number;

  likes: number;

  comments: number;

  engagementScore: number;

  viralScore: number;
}

interface TrendAnalysis {
  keyword: string;

  growthScore: number;

  totalVideos: number;

  analyzedVideos: AnalyzedVideo[];

  trendData: any;

  generatedAt: Date;
}

export async function analyzeTrend(
  keyword: string
): Promise<TrendAnalysis> {

  // CHECK CACHE
  const cached =
    trendCache.get<TrendAnalysis>(
      keyword
    );

  if (cached) {
    return cached;
  }

  // FETCH DATA
  const trendData =
    await getTrendData(keyword);

  const videos =
    await searchVideos(keyword);

  // GROWTH SCORE
  const growthScore =
  calculateGrowthScore(
    videos
  );

  // ANALYZE VIDEOS
  const analyzedVideos =
    videos.map((video: any) => {

      const views =
        Number(
          video.statistics?.viewCount || 1
        );

      const likes =
        Number(
          video.statistics?.likeCount || 0
        );

      const comments =
        Number(
          video.statistics?.commentCount || 0
        );

      const engagementScore =
        calculateEngagementScore(
          views,
          likes,
          comments
        );

      const competitionScore =
        videos.length || 1;

      const viralScore =
        calculateViralScore(
          growthScore,
          engagementScore,
          competitionScore
        );

      return {
        id: video.id,

        title:
          video.snippet?.title || "",

        description:
          video.snippet
            ?.description || "",

        thumbnail:
          video.snippet
            ?.thumbnails
            ?.high
            ?.url || "",

        channel:
          video.snippet
            ?.channelTitle || "",

        publishedAt:
          video.snippet
            ?.publishedAt || "",

        views,

        likes,

        comments,

        engagementScore,

        viralScore,
      };
    });

  // FINAL RESULT
  const result: TrendAnalysis = {
    keyword,

    growthScore,

    totalVideos:
      analyzedVideos.length,

    analyzedVideos,

    trendData,

    generatedAt:
      new Date(),
  };

  // CACHE RESULT
  trendCache.set(
    keyword,
    result
  );

  return result;
}