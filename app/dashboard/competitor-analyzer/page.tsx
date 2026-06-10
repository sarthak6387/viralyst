"use client";

import { useState }
from "react";

export default function
CompetitorAnalyzerPage() {

  const [url, setUrl] =
    useState("");

  const [data, setData] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(false);

  async function analyze() {

    try {

      setLoading(true);

      const response =
        await fetch(
          "/api/analyze-competitor",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              url,
            }),
          }
        );

      const result =
        await response.json();

      setData(result);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);
    }
  }

  return (

    <div className="space-y-8">

      <div>

        <h1
          className="
            text-5xl font-bold
          "
        >
          Competitor Analyzer
        </h1>

        <p className="text-zinc-400 mt-2">
          Analyze YouTube creators
          and discover viral
          content strategies.
        </p>

      </div>

      {/* INPUT */}

      <div
        className="
          glass
          rounded-3xl
          p-8
          flex gap-4
        "
      >

        <input
          placeholder="
            Enter YouTube channel URL
          "
          value={url}
          onChange={(e) =>
            setUrl(
              e.target.value
            )
          }
          className="
            flex-1
            rounded-xl
            border border-white/10
            bg-white/5
            px-4 py-3
          "
        />

        <button
          onClick={analyze}
          className="
            rounded-xl
            bg-gradient-to-r
            from-purple-600
            to-cyan-500
            px-6 py-3
          "
        >
          {
            loading
            ? "Analyzing..."
            : "Analyze"
          }
        </button>

      </div>

      {/* RESULTS */}

      {
  data?.success && (

    <div className="space-y-8">

      {/* ANALYTICS GRID */}

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-6
        "
      >

        {/* UPLOAD CARD */}

        <div
          className="
            rounded-3xl
            border border-white/10
            bg-white/5
            p-8
            backdrop-blur-xl
            shadow-2xl
          "
        >

          <p className="text-zinc-400">
            Upload Frequency
          </p>

          <h2
            className="
              mt-4
              text-6xl
              font-bold
              bg-gradient-to-r
              from-cyan-400
              to-purple-500
              bg-clip-text
              text-transparent
            "
          >
            {
              data.analytics
                .uploadFrequency
            }
          </h2>

          <p className="mt-3 text-zinc-500">
            Recent uploads analyzed
          </p>

        </div>

        {/* KEYWORD CARD */}

        <div
          className="
            rounded-3xl
            border border-white/10
            bg-white/5
            p-8
            backdrop-blur-xl
            shadow-2xl
          "
        >

          <p className="text-zinc-400 mb-6">
            Top Keywords
          </p>

          <div className="flex flex-wrap gap-3">

            {
              data.analytics
                .topKeywords
                .map(
                  (
                    keyword: string
                  ) => (

                    <div
                      key={keyword}
                      className="
                        rounded-full
                        border border-purple-500/30
                        bg-purple-500/10
                        px-4 py-2
                        text-sm
                        font-medium
                        text-purple-300
                        backdrop-blur-xl
                      "
                    >
                      {keyword}
                    </div>
                  )
                )
            }

          </div>

        </div>

      </div>

      {/* CHANNEL VIDEOS */}

      <div
        className="
          rounded-3xl
          border border-white/10
          bg-white/5
          p-8
          backdrop-blur-xl
          shadow-2xl
        "
      >

        <h2
          className="
            text-3xl
            font-bold
            mb-8
          "
        >
          Recent Videos
        </h2>

        <div className="space-y-4">

          {
            data.videos
              .slice(0, 5)
              .map(
                (
                  video: any
                ) => (

                  <div
                    key={
                      video.id.videoId
                    }
                    className="
                      rounded-2xl
                      border border-white/10
                      bg-black/20
                      p-4
                    "
                  >

                    <h3
                      className="
                        text-lg
                        font-semibold
                      "
                    >
                      {
                        video.snippet
                          .title
                      }
                    </h3>

                    <p
                      className="
                        mt-2
                        text-sm
                        text-zinc-400
                      "
                    >
                      Published:
                      {" "}
                      {
                        new Date(
                          video.snippet
                            .publishedAt
                        ).toLocaleDateString()
                      }
                    </p>

                  </div>
                )
              )
          }

        </div>

      </div>

    </div>
  )
}

    </div>
  );
}