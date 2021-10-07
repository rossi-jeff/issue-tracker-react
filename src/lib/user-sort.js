export const userSort = (a, b) => {
  if (a.Name.Last.toLowerCase() > b.Name.Last.toLowerCase()) return 1;
  if (a.Name.Last.toLowerCase() < b.Name.Last.toLowerCase()) return -1;
  return 0;
};
