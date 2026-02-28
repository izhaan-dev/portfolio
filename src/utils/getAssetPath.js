// Helper to resolve asset paths for local and GitHub Pages
export const getAssetPath = (path) => {
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${import.meta.env.BASE_URL}${cleanPath}`;
};
