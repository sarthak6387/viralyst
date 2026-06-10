export function analyzeCompetitor(
  videos: any[]
) {

  if (!videos.length) {

    return {
      uploadFrequency: 0,
      topKeywords: [],
    };
  }

  // EXTRACT TITLES

  const titles =
    videos.map(
      (video) =>
        video.snippet.title
    );

  const words:
  Record<string, number> = {};

  titles.forEach((title) => {

    title
      .toLowerCase()

      // REMOVE SYMBOLS
      .replace(/[^a-zA-Z0-9 ]/g, "")

      .split(" ")

      .forEach((word: string) => {

        // FILTER SHORT WORDS
        if (
          word.length > 4
        ) {

          words[word] =
            (words[word] || 0)
            + 1;
        }
      });
  });

  // REMOVE COMMON USELESS WORDS

  const ignored = [
    "video",
    "youtube",
    "about",
    "their",
    "there",
    "these",
  ];

  const filteredKeywords =
    Object.entries(words)

      .filter(
        ([word]) =>
          !ignored.includes(word)
      )

      .sort(
        (a, b) =>
          b[1] - a[1]
      )

      .slice(0, 12)

      .map(
        ([word]) => word
      );

  return {

    uploadFrequency:
      videos.length,

    topKeywords:
      filteredKeywords,
  };
}