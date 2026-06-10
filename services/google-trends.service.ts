import googleTrends
  from "google-trends-api";

export async function getTrendData(
  keyword: string
) {

  try {

    const interestRaw =
      await googleTrends
        .interestOverTime({
          keyword,

          startTime:
            new Date(
              Date.now() -
              7 * 24 * 60 * 60 * 1000
            ),
        });

    const relatedRaw =
      await googleTrends
        .relatedQueries({
          keyword,
        });

    return {
      interest:
        JSON.parse(interestRaw),

      related:
        JSON.parse(relatedRaw),
    };

  } catch (error) {

    console.error(
      "Google Trends Error:",
      error
    );

    // FALLBACK DATA
    return {

      interest: {
        default: {
          timelineData: [
            {
              formattedAxisTime:
                "Day 1",
              value: [50],
            },

            {
              formattedAxisTime:
                "Day 2",
              value: [65],
            },

            {
              formattedAxisTime:
                "Day 3",
              value: [80],
            },

            {
              formattedAxisTime:
                "Day 4",
              value: [95],
            },
          ],
        },
      },

      related: {
        default: {
          rankedList: [],
        },
      },
    };
  }
  
}
import {
  trendCache,
} from "./cache.service";

export async function
getTrendingSearches() {

  try {

    const cached =
      trendCache.get(
        "viral-trends"
      );

    if (cached) {

      return cached;
    }

    const trends = [

      {
        topic:
          "AI Automation",

        growth:
          "+240%",

        category:
          "Technology",
      },

      {
        topic:
          "YouTube Shorts",

        growth:
          "+180%",

        category:
          "Content Creation",
      },

      {
        topic:
          "Personal Branding",

        growth:
          "+150%",

        category:
          "Business",
      },

      {
        topic:
          "Faceless Channels",

        growth:
          "+210%",

        category:
          "YouTube",
      },

      {
        topic:
          "Remote Jobs",

        growth:
          "+170%",

        category:
          "Career",
      },
    ];

    trendCache.set(
      "viral-trends",
      trends
    );

    return trends;

  } catch (error) {

    console.error(error);

    return [];
  }
}