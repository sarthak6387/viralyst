"use client";

const contentPlan = [

  {
    day: "Monday",
    content:
      "Top 5 AI Tools for Students",
  },

  {
    day: "Tuesday",
    content:
      "Frontend Roadmap Shorts",
  },

  {
    day: "Wednesday",
    content:
      "How to Crack Placements",
  },

  {
    day: "Thursday",
    content:
      "DSA Mistakes Beginners Make",
  },

  {
    day: "Friday",
    content:
      "AI Automation Tutorial",
  },

  {
    day: "Saturday",
    content:
      "Coding Reality Check",
  },

  {
    day: "Sunday",
    content:
      "Weekly Creator Recap",
  },
];

export default function
ContentCalendarPage() {

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
          AI Content Calendar
        </h1>

        <p
          className="
            mt-3
            text-zinc-400
          "
        >
          Personalized weekly
          content strategy powered
          by Viralyst AI.
        </p>

      </div>

      {/* CALENDAR */}

      <div
        className="
          grid
          grid-cols-1
          gap-6
          md:grid-cols-2
          xl:grid-cols-3
        "
      >

        {
          contentPlan.map(
            (item) => (

              <div
                key={item.day}
                className="
                  glass
                  rounded-3xl
                  p-6
                "
              >

                <p
                  className="
                    text-sm
                    text-zinc-400
                  "
                >
                  {item.day}
                </p>

                <h2
                  className="
                    mt-4
                    text-2xl
                    font-bold
                    leading-9
                  "
                >
                  {item.content}
                </h2>

              </div>
            )
          )
        }

      </div>

    </div>
  );
}