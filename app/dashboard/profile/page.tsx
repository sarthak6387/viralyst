"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useAuth,
} from "@/hooks/useAuth";

import {

  saveProfile,

  getProfile,

} from "@/services/profile.service";

import {
  toast,
} from "sonner";

export default function
ProfilePage() {

  const { user } =
    useAuth();

  const [loading, setLoading] =
    useState(false);

  const [profile, setProfile] =
    useState({

      niche: "",

      creatorType: "",

      uploadFrequency: "",

      goal: "",
    });

  useEffect(() => {

    async function loadProfile() {

      if (!user) return;

      const data =
        await getProfile(
          user.uid
        );

      if (data) {

        setProfile(data as any);
      }
    }

    loadProfile();

  }, [user]);
    
  async function save() {
    console.log(user);
    

    if (!user) return;

    try {

      setLoading(true);

      await saveProfile(

        user.uid,

        profile
      );

      toast.success(
        "Profile saved successfully!"
      );

    } catch (error) {

      console.error(error);

      toast.error(
        "Failed to save profile"
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
            text-5xl
            font-bold
          "
        >
          Creator Profile
        </h1>

        <p
          className="
            mt-3
            max-w-2xl
            text-zinc-400
          "
        >
          Personalize Viralyst AI
          according to your creator
          niche and growth goals.
        </p>

      </div>

      {/* FORM */}

      <div
        className="
          glass
          rounded-3xl
          p-8
          space-y-6
        "
      >

        {/* NICHE */}

        <div>

          <label
            className="
              mb-2
              block
              text-sm
              text-zinc-400
            "
          >
            Creator Niche
          </label>

          <select
            value={profile.niche}
            onChange={(e) =>
              setProfile({

                ...profile,

                niche:
                  e.target.value,
              })
            }
            className="
              w-full
              rounded-2xl
              border border-white/10
              bg-white/5
              px-4 py-3
              outline-none
            "
          >

            <option value="">
              Select niche
            </option>

            <option>
              Technology
            </option>

            <option>
              AI & Automation
            </option>

            <option>
              Business
            </option>

            <option>
              Fitness
            </option>

            <option>
              Education
            </option>

            <option>
              Finance
            </option>

            <option>
              Gaming
            </option>

          </select>

        </div>

        {/* CREATOR TYPE */}

        <div>

          <label
            className="
              mb-2
              block
              text-sm
              text-zinc-400
            "
          >
            Creator Type
          </label>

          <select
            value={
              profile.creatorType
            }
            onChange={(e) =>
              setProfile({

                ...profile,

                creatorType:
                  e.target.value,
              })
            }
            className="
              w-full
              rounded-2xl
              border border-white/10
              bg-white/5
              px-4 py-3
              outline-none
            "
          >

            <option value="">
              Select creator type
            </option>

            <option>
              Faceless Creator
            </option>

            <option>
              Personal Brand
            </option>

            <option>
              Shorts Creator
            </option>

            <option>
              Long-form Creator
            </option>

          </select>

        </div>

        {/* FREQUENCY */}

        <div>

          <label
            className="
              mb-2
              block
              text-sm
              text-zinc-400
            "
          >
            Upload Frequency
          </label>

          <select
            value={
              profile.uploadFrequency
            }
            onChange={(e) =>
              setProfile({

                ...profile,

                uploadFrequency:
                  e.target.value,
              })
            }
            className="
              w-full
              rounded-2xl
              border border-white/10
              bg-white/5
              px-4 py-3
              outline-none
            "
          >

            <option value="">
              Select frequency
            </option>

            <option>
              Daily
            </option>

            <option>
              Weekly
            </option>

            <option>
              3x Per Week
            </option>

            <option>
              Monthly
            </option>

          </select>

        </div>

        {/* GOAL */}

        <div>

          <label
            className="
              mb-2
              block
              text-sm
              text-zinc-400
            "
          >
            Growth Goal
          </label>

          <textarea
            rows={5}
            value={profile.goal}
            onChange={(e) =>
              setProfile({

                ...profile,

                goal:
                  e.target.value,
              })
            }
            placeholder="
Describe your creator goals...
            "
            className="
              w-full
              rounded-2xl
              border border-white/10
              bg-white/5
              px-4 py-3
              outline-none
            "
          />

        </div>

        {/* BUTTON */}

        <button
          onClick={save}
          disabled={loading}
          className="
            rounded-2xl
            bg-gradient-to-r
            from-purple-600
            to-cyan-500
            px-6 py-3
            font-medium
            transition-all
            hover:opacity-90
          "
        >

          {
            loading
            ? "Saving..."
            : "Save Profile"
          }

        </button>

      </div>

    </div>
  );
}