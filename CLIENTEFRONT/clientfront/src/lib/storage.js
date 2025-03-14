export const getStorageUrl = (path) => {
  if (!path) return '';
  
  // Si la URL ya es completa, usarla directamente
  if (path.startsWith('http')) {
    return path;
  }
  
  // Construir la URL completa de Google Cloud Storage
  return `https://storage.cloud.google.com/giganteimages/${encodeURIComponent(path)}`;
};
