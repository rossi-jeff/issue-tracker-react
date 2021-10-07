export const FullName = name => {
  let parts = [];
  if (name) {
    if (name.First) parts.push(name.First);
    if (name.Middle) parts.push(name.Middle);
    if (name.Last) parts.push(name.Last);
  }
  return parts.join(" ");
};
