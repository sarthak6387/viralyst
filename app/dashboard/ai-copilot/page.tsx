"use client";

import {
  useState,
} from "react";

import {
  Bot,
  Loader2,
  Sparkles,
} from "lucide-react";

import {
  toast,
} from "sonner";

export default function
AICopilotPage() {

  const [prompt, setPrompt] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [response, setResponse] =
    useState("");

  async function askAI() {

    if (!prompt) {

      toast.error(
        "Please enter a prompt"
      );

      return;
    }

    const toastId =
      toast.loading(
        "AI is thinking..."
      );

    try {

      setLoading(true);

      const res =
        await fetch(
          "/api/ai-copilot",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              prompt,
            }),
          }
        );

      const data =
        await res.json();

      setResponse(
        data.response
      );

      toast.success(
        "Response generated!",
        {
          id: toastId,
        }
      );

    } catch (error) {

      console.error(error);

      toast.error(
        "AI failed to respond",
        {
          id: toastId,
        }
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

          <Bot size={16} />

          Viralyst AI Assistant

        </div>

        <h1
          className="
            mt-6
            text-5xl
            font-bold
          "
        >
          AI Copilot
        </h1>

        <p
          className="
            mt-3
            max-w-2xl
            text-zinc-400
            leading-7
          "
        >
          Your AI creator strategist.
          Ask anything about growth,
          virality, YouTube,
          content strategy,
          hooks, thumbnails,
          or trends.
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

        <textarea
          placeholder="
Ask Viralyst AI anything...
          "
          value={prompt}
          onChange={(e) =>
            setPrompt(
              e.target.value
            )
          }
          rows={6}
          className="
            w-full
            rounded-2xl
            border border-white/10
            bg-black/20
            p-5
            outline-none
            resize-none
          "
        />

        <button
          onClick={askAI}
          disabled={loading}
          className="
            mt-6
            inline-flex
            items-center
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
                  className="
                    animate-spin
                  "
                  size={18}
                />

                Thinking...
              </>
            )
            : (
              <>
                <Sparkles size={18} />
                Ask AI
              </>
            )
          }

        </button>

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

            <div className="space-y-4">

              <div className="h-4 rounded-full bg-white/10" />

              <div className="h-4 w-5/6 rounded-full bg-white/10" />

              <div className="h-4 w-4/6 rounded-full bg-white/10" />

              <div className="h-4 w-3/6 rounded-full bg-white/10" />

            </div>

          </div>
        )
      }

      {/* RESPONSE */}

      {
        response && !loading && (

          <div
            className="
              glass
              rounded-3xl
              p-8
              whitespace-pre-wrap
              leading-8
            "
          >

            <div
              className="
                mb-6
                flex
                items-center
                gap-3
              "
            >

              <Bot
                className="
                  text-cyan-400
                "
              />

              <h2
                className="
                  text-2xl
                  font-bold
                "
              >
                Viralyst AI
              </h2>

            </div>

            {response}

          </div>
        )
      }

    </div>
  );
}