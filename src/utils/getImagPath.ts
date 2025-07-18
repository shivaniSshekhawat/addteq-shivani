// src/utils/getImagePath.ts
export const getImagePath = (fileName: string) => {
  const base = import.meta.env.MODE === "production" ? "/addteq-shivani/" : "/";
  return `${base}phones/${fileName}`;
};
