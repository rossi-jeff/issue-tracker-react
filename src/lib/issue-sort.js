export const issueSort = (a, b) => {
  if (a.Title.toLowerCase() > b.Title.toLowerCase()) return 1;
  if (a.Title.toLowerCase() < b.Title.toLowerCase()) return -1;
  return 0;
};
