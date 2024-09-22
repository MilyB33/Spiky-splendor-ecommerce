export const pluralize = (word: string, count: number): string => {
  if (count > 1) {
    return `${word}s`;
  }

  return word;
};
