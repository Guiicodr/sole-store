import { initDatabase, dbRun, saveDatabase } from "./database.js";
import { v4 as uuidv4 } from "uuid";

async function seed() {
  await initDatabase();

  console.log("🌱 Seeding database...");

  // Clear existing data
  dbRun("DELETE FROM order_items");
  dbRun("DELETE FROM orders");
  dbRun("DELETE FROM product_sizes");
  dbRun("DELETE FROM products");
  dbRun("DELETE FROM users");

const products = [
  {
    name: "Nike Air Max 270",
    brand: "Nike",
    category: "lifestyle",
    description:
      "The Nike Air Max 270 delivers an ultra-comfortable ride with the largest heel Air unit yet. Designed for all-day wear, this lifestyle sneaker combines a mesh and synthetic upper with a foam midsole for responsive cushioning.",
    price: 899.90,
    discount_price: 749.90,
    featured: 1,
    image: "/images/products/air-max-270.png",
    sizes: [
      { size: "38", stock: 10 },
      { size: "39", stock: 8 },
      { size: "40", stock: 15 },
      { size: "41", stock: 12 },
      { size: "42", stock: 7 },
      { size: "43", stock: 5 },
      { size: "44", stock: 3 },
    ],
  },
  {
    name: "Jordan 1 Low",
    brand: "Jordan",
    category: "lifestyle",
    description:
      "The Air Jordan 1 Low remakes the classic silhouette in a low-top profile. Premium leather and Nike Air cushioning provide lasting comfort with an iconic look that never goes out of style.",
    price: 999.90,
    featured: 1,
    image: "/images/products/jordan-1-low.png",
    sizes: [
      { size: "39", stock: 6 },
      { size: "40", stock: 10 },
      { size: "41", stock: 14 },
      { size: "42", stock: 9 },
      { size: "43", stock: 11 },
      { size: "44", stock: 4 },
      { size: "45", stock: 2 },
    ],
  },
  {
    name: "Adidas Samba OG",
    brand: "Adidas",
    category: "lifestyle",
    description:
      "The Adidas Samba OG is a timeless icon that started as a indoor football shoe and became a streetwear legend. Features a full-grain leather upper with suede overlay and a rubber cupsole.",
    price: 799.90,
    featured: 1,
    image: "/images/products/adidas-samba.png",
    sizes: [
      { size: "38", stock: 12 },
      { size: "39", stock: 9 },
      { size: "40", stock: 16 },
      { size: "41", stock: 8 },
      { size: "42", stock: 10 },
      { size: "43", stock: 6 },
      { size: "44", stock: 4 },
    ],
  },
  {
    name: "New Balance 9060",
    brand: "New Balance",
    category: "lifestyle",
    description:
      "The New Balance 9060 reinterprets classic 99X series elements with a futuristic approach. ABZORB and SBS cushioning deliver plush comfort, while the sculpted mesh upper offers breathability.",
    price: 1099.90,
    discount_price: 929.90,
    featured: 1,
    image: "/images/products/new-balance-9060.webp",
    sizes: [
      { size: "39", stock: 7 },
      { size: "40", stock: 11 },
      { size: "41", stock: 13 },
      { size: "42", stock: 8 },
      { size: "43", stock: 9 },
      { size: "44", stock: 5 },
    ],
  },
  {
    name: "Puma Palermo",
    brand: "Puma",
    category: "lifestyle",
    description:
      "The Puma Palermo brings back the terrace style of the 80s with a sleek leather upper and classic T-toe construction. Lightweight and comfortable for everyday wear.",
    price: 599.90,
    image: "/images/products/puma-palermo.png",
    sizes: [
      { size: "38", stock: 10 },
      { size: "39", stock: 8 },
      { size: "40", stock: 14 },
      { size: "41", stock: 10 },
      { size: "42", stock: 6 },
      { size: "43", stock: 7 },
    ],
  },
  {
    name: "ASICS Gel-NYC",
    brand: "Asics",
    category: "running",
    description:
      "The ASICS Gel-NYC blends heritage inspiration with modern technology. GEL technology inserts in the heel and forefoot provide superior shock absorption for a smooth ride.",
    price: 849.90,
    image: "/images/products/asics-gel-nyc.webp",
    sizes: [
      { size: "38", stock: 9 },
      { size: "39", stock: 12 },
      { size: "40", stock: 15 },
      { size: "41", stock: 11 },
      { size: "42", stock: 8 },
      { size: "43", stock: 6 },
      { size: "44", stock: 3 },
      { size: "45", stock: 2 },
    ],
  },
{
    name: "Nike Dunk Low Retro",
    brand: "Nike",
    category: "lifestyle",
    description:
      "The Nike Dunk Low Retro brings back a classic basketball shoe that became a streetwear staple. Leather upper with padded collar for comfort and timeless style.",
    price: 799.90,
    image: "/images/products/air-max-270.png",
    sizes: [
      { size: "39", stock: 5 },
      { size: "40", stock: 10 },
      { size: "41", stock: 12 },
      { size: "42", stock: 8 },
      { size: "43", stock: 7 },
      { size: "44", stock: 4 },
    ],
  },
  {
    name: "Adidas Gazelle",
    brand: "Adidas",
    category: "lifestyle",
    description:
      "The Adidas Gazelle is a classic silhouette known for its clean lines and suede upper. Originally a training shoe, now a lifestyle essential with timeless appeal.",
    price: 749.90,
    image: "/images/products/adidas-samba.png",
    sizes: [
      { size: "38", stock: 8 },
      { size: "39", stock: 10 },
      { size: "40", stock: 14 },
      { size: "41", stock: 9 },
      { size: "42", stock: 11 },
      { size: "43", stock: 5 },
    ],
  },
  {
    name: "New Balance 550",
    brand: "New Balance",
    category: "basketball",
    description:
      "The New Balance 550 is a vintage basketball shoe that made its return with original details. Leather upper with perforated toe and classic NB branding.",
    price: 699.90,
    image: "/images/products/new-balance-9060.webp",
    sizes: [
      { size: "39", stock: 6 },
      { size: "40", stock: 10 },
      { size: "41", stock: 8 },
      { size: "42", stock: 12 },
      { size: "43", stock: 7 },
      { size: "44", stock: 3 },
    ],
  },
  {
    name: "Nike Air Force 1 '07",
    brand: "Nike",
    category: "lifestyle",
    description:
      "The Nike Air Force 1 '07 is the iconic basketball shoe that changed the game. Premium leather upper with Nike Air cushioning for timeless comfort and style.",
    price: 849.90,
    discount_price: 729.90,
    image: "/images/products/air-max-270.png",
    sizes: [
      { size: "38", stock: 7 },
      { size: "39", stock: 10 },
      { size: "40", stock: 15 },
      { size: "41", stock: 12 },
      { size: "42", stock: 9 },
      { size: "43", stock: 6 },
      { size: "44", stock: 4 },
      { size: "45", stock: 2 },
    ],
  },
  {
    name: "Jordan 4 Retro",
    brand: "Jordan",
    category: "basketball",
    description:
      "The Air Jordan 4 Retro is a legendary silhouette designed by Tinker Hatfield. Features a leather and mesh upper with visible Air-Sole unit and iconic wing eyelets.",
    price: 1499.90,
    discount_price: 1299.90,
    featured: 1,
    image: "/images/products/jordan-1-low.png",
    sizes: [
      { size: "40", stock: 4 },
      { size: "41", stock: 6 },
      { size: "42", stock: 8 },
      { size: "43", stock: 5 },
      { size: "44", stock: 3 },
    ],
  },
  {
    name: "Asics Gel-Kayano 30",
    brand: "Asics",
    category: "running",
    description:
      "The ASICS Gel-Kayano 30 is a premium stability running shoe with FF BLAST PLUS ECO cushioning and PureGEL technology for smoother, softer landings.",
    price: 1299.90,
    image: "/images/products/asics-gel-nyc.webp",
    sizes: [
      { size: "39", stock: 5 },
      { size: "40", stock: 8 },
      { size: "41", stock: 10 },
      { size: "42", stock: 7 },
      { size: "43", stock: 6 },
      { size: "44", stock: 4 },
    ],
  },
];

let count = 0;

for (const product of products) {
  const id = uuidv4();
  const images = JSON.stringify([product.image]);

  dbRun(
    "INSERT INTO products (id, name, description, brand, category, price, discount_price, images, featured) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      id,
      product.name,
      product.description,
      product.brand,
      product.category,
      product.price,
      product.discount_price || null,
      images,
      product.featured || 0,
    ]
  );

  for (const size of product.sizes) {
    dbRun("INSERT INTO product_sizes (id, product_id, size, stock) VALUES (?, ?, ?, ?)", [
      uuidv4(),
      id,
      size.size,
      size.stock,
    ]);
  }

  count++;
}

saveDatabase();
console.log(`✅ Seeded ${count} products with sizes.`);
console.log("🌱 Database seeding complete!");
}

seed().catch((err) => {
console.error("❌ Seed failed:", err);
process.exit(1);
});