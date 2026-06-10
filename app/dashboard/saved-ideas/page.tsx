"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  Bookmark,
  Trash2,
} from "lucide-react";

import {
  useAuth,
} from "@/hooks/useAuth";

import {
  getSavedIdeas,
  deleteIdea,
} from "@/services/saved-ideas.service";

import {
  toast,
} from "sonner";

export default function
SavedIdeasPage() {

  const { user } =
    useAuth();

  const [ideas, setIdeas] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    async function loadIdeas() {

      if (!user) return;

      try {

        const data =
          await getSavedIdeas(
            user.uid
          );

        setIdeas(data);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);
      }
    }

    loadIdeas();

  }, [user]);

  async function
  removeIdea(id: string) {

    try {

      await deleteIdea(id);

      setIdeas((prev) =>
        prev.filter(
          (idea) =>
            idea.id !== id
        )
      );

      toast.success(
        "Idea deleted"
      );

    } catch (error) {

      console.error(error);

      toast.error(
        "Failed to delete"
      );
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

          <Bookmark size={16} />

          Creator Workspace

        </div>

        <h1
          className="
            mt-6
            text-5xl
            font-bold
          "
        >
          Saved Ideas
        </h1>

        <p
          className="
            mt-3
            text-zinc-400
            max-w-2xl
          "
        >
          Manage your saved
          scripts, titles,
          hooks, and creator ideas.
        </p>

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
              h-40
            "
          />
        )
      }

      {/* EMPTY */}

      {
        !loading &&
        ideas.length === 0 && (

          <div
            className="
              glass
              rounded-3xl
              p-12
              text-center
            "
          >

            <h2
              className="
                text-2xl
                font-bold
              "
            >
              No Saved Ideas Yet
            </h2>

            <p
              className="
                mt-3
                text-zinc-400
              "
            >
              Start generating
              titles and scripts
              to build your
              creator workspace.
            </p>

          </div>
        )
      }

      {/* IDEAS */}

      <div className="grid gap-6">

        {
          ideas.map((idea) => (

            <div
              key={idea.id}
              className="
                glass
                rounded-3xl
                p-8
              "
            >

              <div
                className="
                  flex
                  items-start
                  justify-between
                  gap-4
                "
              >

                <div>

                  <div
                    className="
                      inline-flex
                      rounded-full
                      bg-purple-500/20
                      px-3 py-1
                      text-sm
                      text-purple-300
                    "
                  >
                    {idea.type}
                  </div>

                  <h2
                    className="
                      mt-4
                      text-2xl
                      font-bold
                    "
                  >
                    {idea.topic}
                  </h2>

                </div>

                <button
                  onClick={() =>
                    removeIdea(
                      idea.id
                    )
                  }
                  className="
                    text-red-400
                    hover:text-red-300
                  "
                >

                  <Trash2 size={20} />

                </button>

              </div>

              <div
                className="
                  mt-6
                  whitespace-pre-wrap
                  text-zinc-300
                  leading-8
                "
              >
                {idea.content}
              </div>

            </div>
          ))
        }

      </div>

    </div>
  );
}