"use client";

import {
  useState,
} from "react";

import {
  useAuth,
} from "@/hooks/useAuth";

import {
  incrementTrendSearches,
} from "@/services/analytics.service";

import {
  toast,
} from "sonner";

import {

  LineChart,

  Line,

  XAxis,

  YAxis,

  Tooltip,

  ResponsiveContainer,

} from "recharts";

import {

  Loader2,

  TrendingUp,

  Flame,

} from "lucide-react";

export default function
TrendExplorerPage() {

  const { user } =
    useAuth();

  const [keyword, setKeyword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [data, setData] =
    useState<any>(null);

  async function analyzeTrend() {

    if (!keyword) {

      toast.error(
        "Please enter a keyword"
      );

      return;
    }

    const toastId =
      toast.loading(
        "Analyzing trend..."
      );

    try {

      setLoading(true);

      const response =
        await fetch(
          "/api/analyze-trend",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              keyword,
            }),
          }
        );

      const result =
        await response.json();

      setData(
        result.data
      );

      // ANALYTICS

      if (user) {

        await incrementTrendSearches(
          user.uid
        );
      }

      toast.success(
        "Trend analyzed successfully!",
        {
          id: toastId,
        }
      );

    } catch (error) {

      console.error(error);

      toast.error(
        "Failed to analyze trend",
        {
          id: toastId,
        }
      );

    } finally {

      setLoading(false);
    }
  }

  const chartData =
    data?.trendData
      ?.interest
      ?.default
      ?.timelineData
      ?.map((item: any) => ({

        date:
          item.formattedAxisTime,

        value:
          item.value[0],

      })) || [];

  return (

    <div className="space-y-8">

      {/* HEADER */}

      <div>

        <div
          className="
            inline-flex
            items-center
            gap-2
            rounded-full
            border border-white/10
            bg-white/5
            px-4 py-2
            text-sm
            text-zinc-300
          "
        >

          <TrendingUp size={16} />

          AI Trend Intelligence

        </div>

        <h1
          className="
            mt-6
            text-5xl
            font-bold
          "
        >
          Trend Explorer
        </h1>

        <p
          className="
            mt-3
            max-w-2xl
            text-zinc-400
            leading-7
          "
        >
          Discover viral opportunities
          before everyone else using
          AI-powered trend analysis.
        </p>

      </div>

      {/* SEARCH */}

      <div
        className="
          glass
          rounded-3xl
          p-8
        "
      >

        <div
          className="
            flex
            flex-col
            gap-4
            md:flex-row
          "
        >

          <input
            placeholder="
Enter trend keyword...
            "
            value={keyword}
            onChange={(e) =>
              setKeyword(
                e.target.value
              )
            }
            className="
              flex-1
              rounded-2xl
              border border-white/10
              bg-white/5
              px-5 py-4
              outline-none
            "
          />

          <button
            onClick={
              analyzeTrend
            }
            disabled={loading}
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-2xl
              bg-gradient-to-r
              from-purple-600
              to-cyan-500
              px-6 py-4
              font-medium
              transition-all
              hover:opacity-90
              disabled:opacity-50
            "
          >

            {
              loading
              ? (
                <>
                  <Loader2
                    size={18}
                    className="
                      animate-spin
                    "
                  />

                  Analyzing...
                </>
              )
              : (
                "Analyze Trend"
              )
            }

          </button>

        </div>

      </div>

      {/* LOADING */}

      {
        loading && (

          <div
            className="
              glass
              animate-pulse
              rounded-3xl
              p-8
            "
          >

            <div
              className="
                flex
                items-center
                gap-3
              "
            >

              <TrendingUp
                className="
                  text-cyan-400
                "
              />

              <p className="text-zinc-400">
                Viralyst AI is analyzing
                realtime trend growth...
              </p>

            </div>

          </div>
        )
      }

      {/* RESULTS */}

      {
        data && !loading && (

          <>

            {/* STATS */}

            <div
              className="
                grid
                grid-cols-1
                gap-6
                md:grid-cols-3
              "
            >

              {/* GROWTH SCORE */}

              <div
                className="
                  glass
                  rounded-3xl
                  p-6
                "
              >

                <p className="text-zinc-400">
                  Growth Score
                </p>

                <h2
                  className="
                    mt-3
                    text-5xl
                    font-bold
                    gradient-text
                  "
                >
                  {
                    data.growthScore
                      ?.toFixed(2)
                  }
                </h2>

              </div>

              {/* VIDEOS */}

              <div
                className="
                  glass
                  rounded-3xl
                  p-6
                "
              >

                <p className="text-zinc-400">
                  Total Videos
                </p>

                <h2
                  className="
                    mt-3
                    text-5xl
                    font-bold
                    gradient-text
                  "
                >
                  {
                    data.totalVideos
                  }
                </h2>

              </div>

              {/* STATUS */}

              <div
                className="
                  glass
                  rounded-3xl
                  p-6
                "
              >

                <p className="text-zinc-400">
                  Trend Status
                </p>

                <div
                  className="
                    mt-4
                    flex
                    items-center
                    gap-3
                  "
                >

                  <Flame
                    className="
                      text-orange-400
                    "
                  />

                  <h2
                    className="
                      text-3xl
                      font-bold
                    "
                  >
                    {
                      data.growthScore > 1.2
                      ? "Viral"
                      : "Emerging"
                    }
                  </h2>

                </div>

              </div>

            </div>

            {/* CHART */}

            <div
              className="
                glass
                rounded-3xl
                p-8
                h-[420px]
              "
            >

              <h2
                className="
                  mb-6
                  text-2xl
                  font-bold
                "
              >
                Trend Growth Timeline
              </h2>

              <ResponsiveContainer
                width="100%"
                height="100%"
              >

                <LineChart
                  data={chartData}
                >

                  <XAxis
                    dataKey="date"
                  />

                  <YAxis />

                  <Tooltip />

                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#8b5cf6"
                    strokeWidth={3}
                  />

                </LineChart>

              </ResponsiveContainer>

            </div>

            {/* VIDEOS */}

            <div className="space-y-6">

              <h2
                className="
                  text-3xl
                  font-bold
                "
              >
                Top Performing Videos
              </h2>

              <div
                className="
                  grid
                  grid-cols-1
                  gap-6
                  xl:grid-cols-2
                "
              >

                {
                  data.analyzedVideos
                    ?.map(
                      (
                        video: any
                      ) => (

                        <div
                          key={video.id}
                          className="
                            glass
                            overflow-hidden
                            rounded-3xl
                          "
                        >

                          <img
                            src={
                              video.thumbnail
                            }
                            alt={
                              video.title
                            }
                            className="
                              h-60
                              w-full
                              object-cover
                            "
                          />

                          <div className="p-6">

                            <h3
                              className="
                                text-xl
                                font-semibold
                                leading-8
                              "
                            >
                              {video.title}
                            </h3>

                            <div
                              className="
                                mt-5
                                flex
                                flex-wrap
                                gap-4
                                text-sm
                                text-zinc-400
                              "
                            >

                              <span>
                                👀
                                {" "}
                                {video.views}
                              </span>

                              <span>
                                ❤️
                                {" "}
                                {video.likes}
                              </span>

                              <span>
                                💬
                                {" "}
                                {video.comments}
                              </span>

                              <span>
                                🚀
                                {" "}
                                {
                                  video
                                    .viralScore
                                    ?.toFixed(2)
                                }
                              </span>

                            </div>

                          </div>

                        </div>
                      )
                    )
                }

              </div>

            </div>

          </>
        )
      }

    </div>
  );
}