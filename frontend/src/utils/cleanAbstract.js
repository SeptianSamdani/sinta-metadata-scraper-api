export const cleanAbstract = (abstract) => {
  if (!abstract) return "Abstract not available.";
  return abstract
    .replace(/<[^>]+>/g, ' ') 
    .replace(/\s+/g, ' ')
    .trim();
};
