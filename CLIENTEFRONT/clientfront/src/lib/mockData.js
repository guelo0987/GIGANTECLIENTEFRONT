export const products = [
  {
    id: 1,
    title: "Tubería PVC 1/2 pulgada",
    image: "/products/llave_lavamano.png",
    category: "PLOMERIA",
    subcategory: "Tuberías",
    brand: "PAVCO",
    description: "Tubería PVC de alta resistencia",
    department: "Plomería"
  },
  {
    id: 2,
    title: "Llave de Lavamanos Cromada",
    image: "/products/llave_lavamano.png",
    category: "PLOMERIA",
    subcategory: "Llaves y Grifos",
    brand: "TYLBA ULTRA",
    description: "Llave monomando para lavamanos",
    department: "Plomería"
  },
  // Añade al menos 10 productos más de ejemplo
];

export const categories = [
  {
    name: "PLOMERIA",
    subcategories: [
      { name: "Tuberías", count: 120 },
      { name: "Llaves y Grifos", count: 85 },
      { name: "Conexiones", count: 64 },
    ]
  },
  {
    name: "MATERIALES DE CONSTRUCCIÓN",
    subcategories: [
      { name: "Cemento", count: 45 },
      { name: "Blocks", count: 32 },
      { name: "Varillas", count: 78 },
    ]
  },
  // ... más categorías
];

export const brands = [
  { name: "PAVCO", count: 45 },
  { name: "TYLBA ULTRA", count: 32 },
  { name: "ARGOS", count: 28 },
  // ... más marcas
];
