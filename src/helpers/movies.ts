const groupAndOrderMovies = (movies: Movie[], order = ["Danny", "Hakush", "Thaai"]) => {
  const grouped = order.map((person) =>
    movies.filter((movie) => movie.person === person)
  );
  const maxLength = Math.max(...grouped.map((group) => group.length));

  const result = [];
  for (let i = 0; i < maxLength; i++) {
    for (const group of grouped) {
      if (group[i]) {
        result.push(group[i]);
      }
    }
  }
  return result;
};

export { groupAndOrderMovies }