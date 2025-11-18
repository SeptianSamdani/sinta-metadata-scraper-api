export const formatAuthors = (authors = []) => {
  if (!authors.length) return "Unknown author";
  return authors
    .map(a => `${a.family || ''} ${a.given || ''}`.trim())
    .join('; ');
};
