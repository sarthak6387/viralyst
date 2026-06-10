export function calculateGrowthScore(
  videos: any[]
) {

  if (!videos.length) {
    return 1;
  }

  const recentVideos =
    videos.filter((video) => {

      const published =
        new Date(
          video.snippet?.publishedAt
        );

      const now = new Date();

      const diffDays =
        (
          now.getTime() -
          published.getTime()
        ) /
        (1000 * 60 * 60 * 24);

      return diffDays <= 7;
    });

  return (
    recentVideos.length /
    videos.length
  ) * 5;
}

export function
calculateEngagementScore(
  views: number,
  likes: number,
  comments: number
) {

  if (!views) return 0;

  return (
    (likes + comments) /
    views
  );
}

export function calculateViralScore(
  growth: number,
  engagement: number,
  competition: number
) {

  if (!competition) return 0;

  return (
    (growth * engagement * 100) /
    competition
  );
}