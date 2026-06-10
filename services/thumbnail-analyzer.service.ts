const hookCategories = {

  fear: [
    "mistake",
    "warning",
    "avoid",
    "don't",
    "stop",
    "fail",
  ],

  curiosity: [
    "secret",
    "nobody",
    "truth",
    "reality",
    "this",
    "why",
  ],

  authority: [
    "best",
    "worst",
    "ultimate",
    "complete",
  ],

  transformation: [
    "roadmap",
    "success",
    "millionaire",
    "transformation",
  ],
};

export function analyzeThumbnailPatterns(
  titles: string[]
) {

  const detectedHooks:
  string[] = [];

  titles.forEach((title) => {

    const lower =
      title.toLowerCase();

    Object.entries(
      hookCategories
    ).forEach(
      ([category, hooks]) => {

        hooks.forEach((hook) => {

          if (
            lower.includes(hook)
          ) {

            detectedHooks.push(
              `${category}: ${hook}`
            );
          }
        });
      }
    );
  });

  const uniqueHooks =
    [...new Set(detectedHooks)];

  return {

    totalHooks:
      uniqueHooks.length,

    topHooks:
      uniqueHooks.slice(0, 10),
  };
}