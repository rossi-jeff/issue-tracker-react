import _ from "lodash";

export const RemoveBlanks = obj => {
  const sanitized = {};
  for (const key in obj) {
    if (key === "__typename") {
      continue;
    }
    if (Array.isArray(obj[key])) {
      sanitized[key] = [];
      for (const value of obj[key]) {
        sanitized[key].push(value);
      }
    } else if (typeof obj[key] === "object") {
      const child = RemoveBlanks(obj[key]);
      if (!_.isEmpty(child)) {
        sanitized[key] = child;
      }
    } else if (obj[key] !== "" && obj[key] !== undefined && obj[key] !== null) {
      sanitized[key] = obj[key];
    }
  }
  return sanitized;
};
