import axios from "axios";

const BASE_URL =
  "https://www.googleapis.com/youtube/v3";

const API_KEY =
  process.env.YOUTUBE_API_KEY;

export async function searchVideos(
  keyword: string
) {

  // SEARCH VIDEOS
  const searchResponse =
    await axios.get(
      `${BASE_URL}/search`,
      {
        params: {
          part: "snippet",
          maxResults: 10,
          q: keyword,
          type: "video",
          key: API_KEY,
        },
      }
    );

  const items =
    searchResponse.data.items;

  // GET VIDEO IDS
  const videoIds =
    items
      .map(
        (item: any) =>
          item.id.videoId
      )
      .join(",");

  // FETCH VIDEO STATISTICS
  const statsResponse =
    await axios.get(
      `${BASE_URL}/videos`,
      {
        params: {
          part:
            "statistics,snippet",
          id: videoIds,
          key: API_KEY,
        },
      }
    );

  return statsResponse.data.items;
}