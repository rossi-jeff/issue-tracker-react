export const projectSort = (a, b) => {
  if (a.Name.toLowerCase() > b.Name.toLowerCase()) return 1;
  if (a.Name.toLowerCase() < b.Name.toLowerCase()) return -1;
  return 0;
};
