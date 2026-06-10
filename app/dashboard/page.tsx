"use client";

import Link from "next/link";

import {
  TrendingUp,
  FileText,
  Users,
  Sparkles,
  ArrowRight,
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
  const [
  trendingTopics,
  setTrendingTopics,
] = useState<any[]>([]);

  const { user } =
    useAuth();

  const [
    analytics,
    setAnalytics,
  ] = useState<any>(null);


 useEffect(() => {

  async function load() {

    if (!user) return;

    /* ANALYTICS */

    const analyticsData =
      await getUserAnalytics(
        user.uid
      );

    setAnalytics(
      analyticsData
    );

    /* LIVE TRENDS */

    const trendRes =
      await fetch(
        "/api/live-trends"
      );

    const trendData =
      await trendRes.json();

    setTrendingTopics(
      trendData.trends || []
    );
  }

  load();

}, [user]);

  return (

    <div className="space-y-10">

      {/* HERO */}

      <div
        className="
          glass
          rounded-3xl
          p-10
          relative
          overflow-hidden
        "
      >

        <div
          className="
            absolute
            top-0 right-0
            w-72 h-72
            bg-purple-500/20
            blur-3xl
          "
        />

        <div className="relative z-10">

          <p className="text-zinc-400">
            Welcome Back 👋
          </p>

          <h1
            className="
              mt-3
              text-6xl
              font-bold
              leading-tight
            "
          >
            Discover
            <span
              className="
                gradient-text
              "
            >
              {" "}Viral{" "}
            </span>
            Opportunities
          </h1>

          <p
            className="
              mt-5
              max-w-2xl
              text-lg
              text-zinc-400
            "
          >
            AI-powered creator
            intelligence platform
            for trend discovery,
            content strategy,
            and viral growth.
          </p>

        </div>

      </div>

      {/* STATS */}

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-4
          gap-6
        "
      >

        {/* TRENDS */}

        <div
          className="
            glass
            rounded-3xl
            p-8
          "
        >

          <p className="text-zinc-400">
            Trends Analyzed
          </p>

          <h2
            className="
              mt-4
              text-5xl
              font-bold
              gradient-text
            "
          >
            {
              analytics?.trendsAnalyzed
              || 0
            }
          </h2>

        </div>

        {/* SCRIPTS */}

        <div
          className="
            glass
            rounded-3xl
            p-8
          "
        >

          <p className="text-zinc-400">
            AI Scripts
          </p>

          <h2
            className="
              mt-4
              text-5xl
              font-bold
              gradient-text
            "
          >
            {
              analytics?.scriptsGenerated
              || 0
            }
          </h2>

        </div>

        {/* IDEAS */}

        <div
          className="
            glass
            rounded-3xl
            p-8
          "
        >

          <p className="text-zinc-400">
            Viral Ideas
          </p>

          <h2
            className="
              mt-4
              text-5xl
              font-bold
              gradient-text
            "
          >
            {
              analytics?.ideasGenerated
              || 0
            }
          </h2>

        </div>

        {/* CREATOR SCORE */}

        <div
          className="
            glass
            rounded-3xl
            p-8
          "
        >

          <p className="text-zinc-400">
            Creator Score
          </p>

          <h2
            className="
              mt-4
              text-5xl
              font-bold
              gradient-text
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
            flex items-center
            justify-between
            mb-6
          "
        >

          <h2
            className="
              text-3xl
              font-bold
            "
          >
            Quick Actions
          </h2>

        </div>

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-4
            gap-6
          "
        >

          {/* TREND EXPLORER */}

          <Link
            href="/dashboard/trend-explorer"
            className="
              glass
              rounded-3xl
              p-8
              hover:scale-[1.02]
              transition-all
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
                mt-2
                text-zinc-400
              "
            >
              Discover trending
              opportunities.
            </p>

          </Link>

          {/* TITLE GENERATOR */}

          <Link
            href="/dashboard/title-generator"
            className="
              glass
              rounded-3xl
              p-8
              hover:scale-[1.02]
              transition-all
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
                mt-2
                text-zinc-400
              "
            >
              Generate viral
              high CTR titles.
            </p>

          </Link>

          {/* COMPETITOR ANALYZER */}

          <Link
            href="/dashboard/competitor-analyzer"
            className="
              glass
              rounded-3xl
              p-8
              hover:scale-[1.02]
              transition-all
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
                mt-2
                text-zinc-400
              "
            >
              Analyze creators and
              discover patterns.
            </p>

          </Link>

          {/* SCRIPT GENERATOR */}

          <Link
            href="/dashboard/script-generator"
            className="
              glass
              rounded-3xl
              p-8
              hover:scale-[1.02]
              transition-all
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
                mt-2
                text-zinc-400
              "
            >
              Generate retention
              optimized scripts.
            </p>

          </Link>

        </div>

      </div>

      {/* TRENDING TOPICS */}

     {/* TRENDING TOPICS */}

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
      items-center
      justify-between
      mb-8
    "
  >

    <h2
      className="
        text-3xl
        font-bold
      "
    >
      Trending Topics
    </h2>

  </div>

  <div className="space-y-4">

    {
      trendingTopics.map(
        (
          trend,
          index
        ) => (

          <div
            key={index}
            className="
              flex
              items-center
              justify-between
              rounded-2xl
              border border-white/10
              bg-black/20
              p-5
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
                {trend.category}
              </p>

            </div>

            <div
              className="
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