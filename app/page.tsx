"use client";

import Link from "next/link";

import {
  TrendingUp,
  FileText,
  Users,
  Sparkles,
  ArrowRight,
  Zap,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import {
  useAuth,
} from "@/hooks/useAuth";

import {
  getUserAnalytics,
} from "@/services/analytics.service";

export default function DashboardPage() {

  const { user } =
    useAuth();

  const [
    analytics,
    setAnalytics,
  ] = useState<any>(null);

  useEffect(() => {

    async function load() {

      if (!user) return;

      const data =
        await getUserAnalytics(
          user.uid
        );

      setAnalytics(data);
    }

    load();

  }, [user]);

  const trendingTopics = [

    {
      topic:
        "AI Tools",
      growth:
        "+240%",
    },

    {
      topic:
        "Placement Prep",
      growth:
        "+180%",
    },

    {
      topic:
        "Fitness Transformation",
      growth:
        "+150%",
    },
  ];

  return (

    <div className="space-y-8 md:space-y-10">

      {/* HERO */}

      <div
        className="
          glass
          relative
          overflow-hidden
          rounded-3xl
          p-6 md:p-10
        "
      >

        {/* GLOW */}

        <div
          className="
            absolute
            right-0 top-0
            h-72 w-72
            bg-purple-500/20
            blur-3xl
          "
        />

        <div className="relative z-10">

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

            <Zap size={16} />

            AI Creator Intelligence

          </div>

          <h1
            className="
              mt-6
              max-w-4xl
              text-4xl
              font-bold
              leading-tight
              md:text-6xl
            "
          >

            Discover
            <span className="gradient-text">
              {" "}Viral{" "}
            </span>
            Opportunities

          </h1>

          <p
            className="
              mt-5
              max-w-2xl
              text-base
              leading-7
              text-zinc-400
              md:text-lg
            "
          >

            AI-powered creator
            intelligence platform
            for trend discovery,
            content strategy,
            audience psychology,
            and viral growth.

          </p>

        </div>

      </div>

      {/* STATS */}

      <div
        className="
          grid
          grid-cols-1
          gap-6
          md:grid-cols-2
          xl:grid-cols-4
        "
      >

        {/* CARD */}

        <div
          className="
            glass
            rounded-3xl
            p-6 md:p-8
            transition-all
            hover:scale-[1.02]
          "
        >

          <p className="text-zinc-400">
            Trends Analyzed
          </p>

          <h2
            className="
              mt-4
              text-3xl
              font-bold
              gradient-text
              md:text-5xl
            "
          >

            {
              analytics?.trendsAnalyzed
              || 0
            }

          </h2>

        </div>

        {/* CARD */}

        <div
          className="
            glass
            rounded-3xl
            p-6 md:p-8
            transition-all
            hover:scale-[1.02]
          "
        >

          <p className="text-zinc-400">
            AI Scripts
          </p>

          <h2
            className="
              mt-4
              text-3xl
              font-bold
              gradient-text
              md:text-5xl
            "
          >

            {
              analytics?.scriptsGenerated
              || 0
            }

          </h2>

        </div>

        {/* CARD */}

        <div
          className="
            glass
            rounded-3xl
            p-6 md:p-8
            transition-all
            hover:scale-[1.02]
          "
        >

          <p className="text-zinc-400">
            Viral Ideas
          </p>

          <h2
            className="
              mt-4
              text-3xl
              font-bold
              gradient-text
              md:text-5xl
            "
          >

            {
              analytics?.ideasGenerated
              || 0
            }

          </h2>

        </div>

        {/* CARD */}

        <div
          className="
            glass
            rounded-3xl
            p-6 md:p-8
            transition-all
            hover:scale-[1.02]
          "
        >

          <p className="text-zinc-400">
            Creator Score
          </p>

          <h2
            className="
              mt-4
              text-3xl
              font-bold
              gradient-text
              md:text-5xl
            "
          >

            {
              analytics?.creatorScore
              || 0
            }

          </h2>

        </div>

      </div>

      {/* QUICK ACTIONS */}

      <div>

        <div
          className="
            mb-6
            flex
            items-center
            justify-between
          "
        >

          <h2
            className="
              text-2xl
              font-bold
              md:text-3xl
            "
          >
            Quick Actions
          </h2>

        </div>

        <div
          className="
            grid
            grid-cols-1
            gap-6
            md:grid-cols-2
            xl:grid-cols-4
          "
        >

          {/* ACTION CARD */}

          <Link
            href="/dashboard/trend-explorer"
            className="
              glass
              rounded-3xl
              p-8
              transition-all
              hover:scale-[1.02]
              hover:border-cyan-400/20
            "
          >

            <TrendingUp
              className="
                text-cyan-400
              "
            />

            <h3
              className="
                mt-5
                text-2xl
                font-bold
              "
            >
              Trend Explorer
            </h3>

            <p
              className="
                mt-3
                leading-7
                text-zinc-400
              "
            >
              Discover trending
              opportunities and
              breakout topics.
            </p>

          </Link>

          {/* ACTION CARD */}

          <Link
            href="/dashboard/title-generator"
            className="
              glass
              rounded-3xl
              p-8
              transition-all
              hover:scale-[1.02]
              hover:border-purple-400/20
            "
          >

            <Sparkles
              className="
                text-purple-400
              "
            />

            <h3
              className="
                mt-5
                text-2xl
                font-bold
              "
            >
              Title Generator
            </h3>

            <p
              className="
                mt-3
                leading-7
                text-zinc-400
              "
            >
              Generate viral
              high CTR YouTube
              titles instantly.
            </p>

          </Link>

          {/* ACTION CARD */}

          <Link
            href="/dashboard/competitor-analyzer"
            className="
              glass
              rounded-3xl
              p-8
              transition-all
              hover:scale-[1.02]
              hover:border-pink-400/20
            "
          >

            <Users
              className="
                text-pink-400
              "
            />

            <h3
              className="
                mt-5
                text-2xl
                font-bold
              "
            >
              Competitor Analyzer
            </h3>

            <p
              className="
                mt-3
                leading-7
                text-zinc-400
              "
            >
              Analyze creators,
              patterns, and
              viral strategies.
            </p>

          </Link>

          {/* ACTION CARD */}

          <Link
            href="/dashboard/script-generator"
            className="
              glass
              rounded-3xl
              p-8
              transition-all
              hover:scale-[1.02]
              hover:border-green-400/20
            "
          >

            <FileText
              className="
                text-green-400
              "
            />

            <h3
              className="
                mt-5
                text-2xl
                font-bold
              "
            >
              Script Generator
            </h3>

            <p
              className="
                mt-3
                leading-7
                text-zinc-400
              "
            >
              Generate retention
              optimized AI scripts.
            </p>

          </Link>

        </div>

      </div>

      {/* TRENDING TOPICS */}

      <div
        className="
          glass
          rounded-3xl
          p-6 md:p-8
        "
      >

        <div
          className="
            mb-8
            flex
            items-center
            justify-between
          "
        >

          <h2
            className="
              text-2xl
              font-bold
              md:text-3xl
            "
          >
            Trending Topics
          </h2>

          <ArrowRight />

        </div>

        <div className="space-y-4">

          {
            trendingTopics.map(
              (trend) => (

                <div
                  key={trend.topic}
                  className="
                    flex
                    flex-col
                    gap-4
                    rounded-2xl
                    border border-white/10
                    bg-black/20
                    p-5
                    md:flex-row
                    md:items-center
                    md:justify-between
                  "
                >

                  <div>

                    <h3
                      className="
                        text-xl
                        font-semibold
                      "
                    >
                      {trend.topic}
                    </h3>

                    <p className="text-zinc-500">
                      High viral potential
                    </p>

                  </div>

                  <div
                    className="
                      inline-flex
                      w-fit
                      rounded-full
                      bg-green-500/20
                      px-4 py-2
                      text-green-400
                    "
                  >
                    {trend.growth}
                  </div>

                </div>
              )
            )
          }

        </div>

      </div>

    </div>
  );
}