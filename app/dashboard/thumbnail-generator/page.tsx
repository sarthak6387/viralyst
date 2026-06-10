"use client";

import {
  useState,
} from "react";

import {
  ImageIcon,
  Loader2,
} from "lucide-react";

import {
  toast,
} from "sonner";

export default function
ThumbnailGeneratorPage() {

  const [topic, setTopic] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [ideas, setIdeas] =
    useState<string[]>([]);

  async function generateIdeas() {

    if (!topic) {

      toast.error(
        "Enter a topic"
      );

      return;
    }

    try {

      setLoading(true);

      // TEMP MOCK DATA

      await new Promise(
        (resolve) =>
          setTimeout(
            resolve,
            1500
          )
      );

      setIdeas([

        "Shocked face + red arrows + bold text",

        "Before vs After transformation layout",

        "Dark background with glowing text",

        "Huge earnings screenshot + reaction",

        "Minimal thumbnail with emotional face",

        "Big bold word: 'MISTAKE'",

      ]);

      toast.success(
        "Thumbnail ideas generated!"
      );

    } catch (error) {

      console.error(error);

      toast.error(
        "Generation failed"
      );

    } finally {

      setLoading(false);
    }
  }

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

          <ImageIcon size={16} />

          AI Thumbnail Intelligence

        </div>

        <h1
          className="
            mt-6
            text-5xl
            font-bold
          "
        >
          Thumbnail Generator
        </h1>

        <p
          className="
            mt-3
            max-w-2xl
            text-zinc-400
          "
        >
          Generate viral thumbnail
          ideas optimized for
          YouTube CTR psychology.
        </p>

      </div>

      {/* INPUT */}

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
Enter video topic...
            "
            value={topic}
            onChange={(e) =>
              setTopic(
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
              generateIdeas
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
                "Generate Ideas"
              )
            }

          </button>

        </div>

      </div>

      {/* RESULTS */}

      {
        ideas.length > 0 && (

          <div
            className="
              grid
              grid-cols-1
              gap-6
              md:grid-cols-2
            "
          >

            {
              ideas.map(
                (
                  idea,
                  index
                ) => (

                  <div
                    key={index}
                    className="
                      glass
                      rounded-3xl
                      p-6
                    "
                  >

                    <div
                      className="
                        mb-5
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-2xl
                        bg-gradient-to-r
                        from-purple-600
                        to-cyan-500
                      "
                    >

                      <ImageIcon />

                    </div>

                    <p
                      className="
                        text-lg
                        leading-8
                      "
                    >
                      {idea}
                    </p>

                  </div>
                )
              )
            }

          </div>
        )
      }

    </div>
  );
}