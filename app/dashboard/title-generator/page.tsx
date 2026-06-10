"use client";

import {
  useState,
  useEffect,
} from "react";

import {
  Loader2,
  Sparkles,
  TrendingUp,
} from "lucide-react";

import {
  toast,
} from "sonner";

import {
  useAuth,
} from "@/hooks/useAuth";

import {
  getProfile,
} from "@/services/profile.service";

import {
  incrementTitlesGenerated,
} from "@/services/analytics.service";

export default function
TitleGeneratorPage() {

  const { user } =
    useAuth();

  const [profile, setProfile] =
    useState<any>(null);

  const [keyword, setKeyword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [data, setData] =
    useState<any>(null);

  /* LOAD PROFILE */

  useEffect(() => {

    async function loadProfile() {

      if (!user) return;

      const data =
        await getProfile(
          user.uid
        );

      setProfile(data);
    }

    loadProfile();

  }, [user]);

  /* GENERATE TITLES */

  async function generateTitles() {

    if (!keyword) {

      toast.error(
        "Please enter a topic"
      );

      return;
    }

    const toastId =
      toast.loading(
        "Generating viral titles..."
      );

    try {

      setLoading(true);

      const response =
        await fetch(
          "/api/generate-titles",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({

              keyword,

              niche:
                profile?.niche,

              creatorType:
                profile?.creatorType,

              goal:
                profile?.goal,
            }),
          }
        );

      const result =
        await response.json();

      setData(result);

      /* ANALYTICS */

      if (user) {

        await incrementTitlesGenerated(
          user.uid
        );
      }

      toast.success(
        "Titles generated successfully!",
        {
          id: toastId,
        }
      );

    } catch (error) {

      console.error(error);

      toast.error(
        "Failed to generate titles",
        {
          id: toastId,
        }
      );

    } finally {

      setLoading(false);
    }
  }

  /* UI */

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

          <Sparkles size={16} />

          Personalized AI Engine

        </div>

        <h1
          className="
            mt-6
            text-4xl
            font-bold
            md:text-5xl
          "
        >
          Title Generator
        </h1>

        <p
          className="
            mt-3
            max-w-2xl
            text-zinc-400
            leading-7
          "
        >
          Generate personalized
          high CTR YouTube titles
          using AI creator psychology,
          viral patterns, and your
          creator profile.
        </p>

      </div>

      {/* PROFILE BADGES */}

      {
        profile && (

          <div
            className="
              flex
              flex-wrap
              gap-3
            "
          >

            <div
              className="
                rounded-full
                bg-purple-500/20
                px-4 py-2
                text-sm
                text-purple-300
              "
            >
              {profile.niche}
            </div>

            <div
              className="
                rounded-full
                bg-cyan-500/20
                px-4 py-2
                text-sm
                text-cyan-300
              "
            >
              {profile.creatorType}
            </div>

          </div>
        )
      }

      {/* INPUT */}

      <div
        className="
          glass
          rounded-3xl
          p-6 md:p-8
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
Enter your video topic...
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
              generateTitles
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

                  Generating...
                </>
              )
              : (
                "Generate Titles"
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
                Viralyst AI is generating
                personalized viral titles...
              </p>

            </div>

          </div>
        )
      }

      {/* RESULTS */}

      {
        data && !loading && (

          <div className="space-y-8">

            {/* PATTERNS */}

            <div
              className="
                glass
                rounded-3xl
                p-6 md:p-8
              "
            >

              <h2
                className="
                  mb-6
                  text-2xl
                  font-bold
                "
              >
                Viral Title Patterns
              </h2>

              <div
                className="
                  grid
                  grid-cols-1
                  gap-6
                  md:grid-cols-3
                "
              >

                {/* NUMBERS */}

                <div
                  className="
                    rounded-2xl
                    border border-white/10
                    bg-black/20
                    p-6
                  "
                >

                  <p className="text-zinc-400">
                    Numbers Used
                  </p>

                  <h3
                    className="
                      mt-3
                      text-4xl
                      font-bold
                      gradient-text
                    "
                  >
                    {
                      data?.patterns
                      ?.numbers ?? 0
                    }
                  </h3>

                </div>

                {/* QUESTIONS */}

                <div
                  className="
                    rounded-2xl
                    border border-white/10
                    bg-black/20
                    p-6
                  "
                >

                  <p className="text-zinc-400">
                    Questions
                  </p>

                  <h3
                    className="
                      mt-3
                      text-4xl
                      font-bold
                      gradient-text
                    "
                  >
                    {
                      data?.patterns
                      ?.questions ?? 0
                    }
                  </h3>

                </div>

                {/* EMOTIONAL HOOKS */}

                <div
                  className="
                    rounded-2xl
                    border border-white/10
                    bg-black/20
                    p-6
                  "
                >

                  <p className="text-zinc-400">
                    Emotional Hooks
                  </p>

                  <div
                    className="
                      mt-4
                      flex
                      flex-wrap
                      gap-2
                    "
                  >

                    {
                      data?.patterns
                      ?.emotionalWords
                      ?.slice(0, 5)
                      ?.map(
                        (
                          word: string,
                          index: number
                        ) => (

                          <span
                            key={index}
                            className="
                              rounded-full
                              bg-purple-500/20
                              px-3 py-1
                              text-sm
                              text-purple-300
                            "
                          >
                            {word}
                          </span>
                        )
                      )
                    }

                  </div>

                </div>

              </div>

            </div>

            {/* TITLES */}

            <div
              className="
                glass
                rounded-3xl
                p-6 md:p-8
              "
            >

              <h2
                className="
                  mb-8
                  text-3xl
                  font-bold
                "
              >
                Personalized Titles
              </h2>

              <div className="space-y-4">

                {
                  data.generatedTitles
                    ?.split("\n")
                    ?.filter(
                      (
                        title: string
                      ) =>
                        title.trim()
                    )
                    ?.map(
                      (
                        title: string,
                        index: number
                      ) => (

                        <div
                          key={index}
                          className="
                            rounded-2xl
                            border border-white/10
                            bg-black/20
                            p-5
                            transition-all
                            hover:border-purple-500/20
                          "
                        >

                          <div
                            className="
                              flex
                              items-start
                              gap-4
                            "
                          >

                            <div
                              className="
                                mt-1
                                flex
                                h-8
                                w-8
                                items-center
                                justify-center
                                rounded-full
                                bg-gradient-to-r
                                from-purple-600
                                to-cyan-500
                                text-sm
                                font-bold
                              "
                            >
                              {index + 1}
                            </div>

                            <p
                              className="
                                flex-1
                                text-lg
                                leading-8
                              "
                            >
                              {title}
                            </p>

                          </div>

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