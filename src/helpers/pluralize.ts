const pluralize = (word: string, count: number) => {
  return `${word}${count > 1 ? "s" : ""}`;
};

export default pluralize;