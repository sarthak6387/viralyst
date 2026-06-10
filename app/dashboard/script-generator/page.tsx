"use client";

import { useState }
from "react";

import jsPDF
from "jspdf";

import {
  Loader2,
} from "lucide-react";

import {
  toast,
} from "sonner";

import {
  useAuth,
} from "@/hooks/useAuth";

import {
  saveIdea,
} from "@/services/saved-ideas.service";

import {
  incrementScriptsGenerated,
} from "@/services/analytics.service";

export default function
ScriptGeneratorPage() {

  const { user } =
    useAuth();

  const [topic, setTopic] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [script, setScript] =
    useState("");

  /* SAVE SCRIPT */

  async function saveScript() {

    try {

      if (
        !user ||
        !script
      ) return;

      await saveIdea(

        user.uid,

        "script",

        topic,

        script
      );

      toast.success(
        "Script saved successfully!"
      );

    } catch (error) {

      console.error(error);

      toast.error(
        "Failed to save script"
      );
    }
  }

  /* EXPORT PDF */

  function exportPDF() {

    try {

      if (!script) return;

      const doc =
        new jsPDF();

      doc.setFontSize(18);

      doc.text(
        "Viralyst AI Script",
        20,
        20
      );

      doc.setFontSize(11);

      const lines =
        doc.splitTextToSize(
          script,
          170
        );

      doc.text(
        lines,
        20,
        40
      );

      doc.save(
        "viralyst-script.pdf"
      );

      toast.success(
        "PDF exported successfully!"
      );

    } catch (error) {

      console.error(error);

      toast.error(
        "Failed to export PDF"
      );
    }
  }

  /* GENERATE SCRIPT */

  async function generate() {

    if (!topic) {

      toast.error(
        "Please enter a topic"
      );

      return;
    }

    const toastId =
      toast.loading(
        "Generating AI script..."
      );

    try {

      setLoading(true);

      const response =
        await fetch(
          "/api/generate-script",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              topic,
            }),
          }
        );

      const data =
        await response.json();

      setScript(
        data.script
      );

      if (user) {

        await incrementScriptsGenerated(
          user.uid
        );
      }

      toast.success(
        "Script generated successfully!",
        {
          id: toastId,
        }
      );

    } catch (error) {

      console.error(error);

      toast.error(
        "Something went wrong",
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

        <h1
          className="
            text-4xl
            md:text-5xl
            font-bold
          "
        >
          AI Script Generator
        </h1>

        <p
          className="
            mt-3
            text-zinc-400
          "
        >
          Generate high-retention
          YouTube scripts using
          Viralyst AI.
        </p>

      </div>

      {/* INPUT SECTION */}

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
              bg-black/20
              px-5 py-4
              outline-none
            "
          />

          <button
            onClick={generate}
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
                "Generate Script"
              )
            }

          </button>

        </div>

      </div>

      {/* LOADING CARD */}

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

            <p className="text-zinc-400">
              Viralyst AI is generating
              a high-retention script...
            </p>

            <div className="mt-6 space-y-4">

              <div
                className="
                  h-4
                  rounded-full
                  bg-white/10
                "
              />

              <div
                className="
                  h-4
                  w-5/6
                  rounded-full
                  bg-white/10
                "
              />

              <div
                className="
                  h-4
                  w-4/6
                  rounded-full
                  bg-white/10
                "
              />

            </div>

          </div>
        )
      }

      {/* SCRIPT OUTPUT */}

      {
        script && !loading && (

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
                text-3xl
                font-bold
              "
            >
              Generated Script
            </h2>

            <div
              className="
                whitespace-pre-wrap
                leading-8
                text-zinc-300
              "
            >
              {script}
            </div>

            {/* ACTION BUTTONS */}

            <div
              className="
                mt-8
                flex
                flex-wrap
                gap-4
              "
            >

              {/* SAVE */}

              <button
                onClick={saveScript}
                className="
                  rounded-xl
                  bg-gradient-to-r
                  from-purple-600
                  to-cyan-500
                  px-6 py-3
                  font-medium
                "
              >
                Save Script
              </button>

              {/* EXPORT */}

              <button
                onClick={exportPDF}
                className="
                  rounded-xl
                  border border-white/10
                  bg-white/5
                  px-6 py-3
                  font-medium
                  transition-all
                  hover:bg-white/10
                "
              >
                Export PDF
              </button>

            </div>

          </div>
        )
      }

    </div>
  );
}