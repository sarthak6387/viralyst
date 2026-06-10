const emotionalWords = [
  "secret",
  "mistake",
  "truth",
  "nobody",
  "best",
  "worst",
  "easy",
  "hard",
  "crazy",
  "insane",
  "reality",
];

export function analyzeTitles(
  titles: string[]
) {

  const patterns = {
    numbers: 0,
    questions: 0,
    emotionalWords: [] as string[],
  };

  titles.forEach((title) => {

    // NUMBERS
    if (/\d/.test(title)) {
      patterns.numbers++;
    }

    // QUESTIONS
    if (title.includes("?")) {
      patterns.questions++;
    }

    // EMOTIONAL WORDS
    emotionalWords.forEach((word) => {

      if (
        title
          .toLowerCase()
          .includes(word)
      ) {
        patterns
          .emotionalWords
          .push(word);
      }
    });
  });

  return patterns;
}