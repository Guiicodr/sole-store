import { initDatabase, dbRun, saveDatabase } from "./database.js";
import { v4 as uuidv4 } from "uuid";

async function seed() {
  await initDatabase();
  console.log("Seeding database...");
  dbRun("DELETE FROM order_items");
  dbRun("DELETE FROM orders");
  dbRun("DELETE FROM product_sizes");
  dbRun("DELETE FROM products");
  dbRun("DELETE FROM users");
  const products = [
    { name: "Nike Air Max 95 Essential", brand: "Nike", category: "lifestyle", description: "O Nike Air Max 95 Essential traz o design iconico que revolucionou o streetwear.", price: 1099.90, discount_price: 949.90, featured: 1, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80", sizes: [{ size: "38", stock: 8 }, { size: "39", stock: 12 }, { size: "40", stock: 15 }, { size: "41", stock: 10 }, { size: "42", stock: 6 }, { size: "43", stock: 4 }, { size: "44", stock: 2 }] },
    { name: "Nike Court Vision Low", brand: "Nike", category: "lifestyle", description: "O Nike Court Vision Low e um tenis casual que combina estilo retro com conforto moderno.", price: 449.90, featured: 0, image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80", sizes: [{ size: "38", stock: 15 }, { size: "39", stock: 20 }, { size: "40", stock: 18 }, { size: "41", stock: 14 }, { size: "42", stock: 10 }, { size: "43", stock: 7 }, { size: "44", stock: 5 }, { size: "45", stock: 3 }] },
    { name: "Air Jordan 1 High OG Chicago", brand: "Jordan", category: "lifestyle", description: "O Air Jordan 1 High OG Chicago e o tenis que comecou tudo.", price: 2199.90, discount_price: 1899.90, featured: 1, image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800&q=80", sizes: [{ size: "39", stock: 3 }, { size: "40", stock: 5 }, { size: "41", stock: 8 }, { size: "42", stock: 7 }, { size: "43", stock: 4 }, { size: "44", stock: 2 }] },
    { name: "Jordan 1 Mid SE", brand: "Jordan", category: "lifestyle", description: "O Jordan 1 Mid SE oferece o estilo classico do AJ1 com um perfil mid-top versatil.", price: 1299.90, featured: 1, image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80", sizes: [{ size: "38", stock: 6 }, { size: "39", stock: 10 }, { size: "40", stock: 14 }, { size: "41", stock: 12 }, { size: "42", stock: 8 }, { size: "43", stock: 5 }, { size: "44", stock: 3 }] },
    { name: "Adidas Yeezy Boost 350 V2 Carbon Beluga", brand: "Adidas", category: "lifestyle", description: "O Yeezy Boost 350 V2 Carbon Beluga e um dos mais cobicados.", price: 2899.90, discount_price: 2599.90, featured: 1, image: "https://images.unsplash.com/photo-1605330054801-5d5511b3f0b1?w=800&q=80", sizes: [{ size: "39", stock: 2 }, { size: "40", stock: 4 }, { size: "41", stock: 6 }, { size: "42", stock: 5 }, { size: "43", stock: 3 }, { size: "44", stock: 1 }] },
    { name: "Nike Dunk Low Retro White Black (Panda)", brand: "Nike", category: "lifestyle", description: "O Nike Dunk Low Panda e o fenomeno da cultura sneaker.", price: 999.90, discount_price: 849.90, featured: 1, image: "https://images.unsplash.com/photo-1617042375872-a5cb08b0e27d?w=800&q=80", sizes: [{ size: "38", stock: 10 }, { size: "39", stock: 15 }, { size: "40", stock: 20 }, { size: "41", stock: 18 }, { size: "42", stock: 14 }, { size: "43", stock: 8 }, { size: "44", stock: 5 }, { size: "45", stock: 3 }] },
    { name: "New Balance 550", brand: "New Balance", category: "basketball", description: "O New Balance 550 e um tenis de basquete vintage.", price: 699.90, featured: 0, image: "https://images.unsplash.com/photo-1597045566677-266b1f3b6cd6?w=800&q=80", sizes: [{ size: "39", stock: 6 }, { size: "40", stock: 10 }, { size: "41", stock: 8 }, { size: "42", stock: 12 }, { size: "43", stock: 7 }, { size: "44", stock: 3 }] },
    { name: "Nike Air Force 1 07", brand: "Nike", category: "lifestyle", description: "O Nike Air Force 1 07 e o iconico tenis que mudou o jogo.", price: 849.90, discount_price: 729.90, featured: 1, image: "https://images.unsplash.com/photo-1594897030264-ab7d87efce73?w=800&q=80", sizes: [{ size: "38", stock: 7 }, { size: "39", stock: 10 }, { size: "40", stock: 15 }, { size: "41", stock: 12 }, { size: "42", stock: 9 }, { size: "43", stock: 6 }, { size: "44", stock: 4 }, { size: "45", stock: 2 }] },
    { name: "Jordan 4 Retro Military Black", brand: "Jordan", category: "basketball", description: "O Air Jordan 4 Retro Military Black e uma silhueta lendaria.", price: 1499.90, discount_price: 1299.90, featured: 1, image: "https://images.unsplash.com/photo-1575537301864-96e1392e1a1f?w=800&q=80", sizes: [{ size: "40", stock: 4 }, { size: "41", stock: 6 }, { size: "42", stock: 8 }, { size: "43", stock: 5 }, { size: "44", stock: 3 }] },
    { name: "Asics Gel-Kayano 30", brand: "Asics", category: "running", description: "O ASICS Gel-Kayano 30 e um tenis de corrida premium.", price: 1299.90, featured: 1, image: "https://images.unsplash.com/photo-1551107696-a4b0c5a9d257?w=800&q=80", sizes: [{ size: "39", stock: 5 }, { size: "40", stock: 8 }, { size: "41", stock: 10 }, { size: "42", stock: 7 }, { size: "43", stock: 6 }, { size: "44", stock: 4 }] },
    { name: "Adidas Ultraboost 23", brand: "Adidas", category: "running", description: "O Adidas Ultraboost 23 e referencia em conforto.", price: 1199.90, discount_price: 999.90, featured: 0, image: "https://images.unsplash.com/photo-1608233685020-6cb57a3c6ae0?w=800&q=80", sizes: [{ size: "38", stock: 8 }, { size: "39", stock: 12 }, { size: "40", stock: 16 }, { size: "41", stock: 14 }, { size: "42", stock: 10 }, { size: "43", stock: 6 }, { size: "44", stock: 4 }] },
    { name: "Puma Suede Classic XXI", brand: "Puma", category: "lifestyle", description: "O Puma Suede Classic XXI e um icone atemporal.", price: 399.90, featured: 0, image: "https://images.unsplash.com/photo-1600525000432-99fc063e5a37?w=800&q=80", sizes: [{ size: "38", stock: 20 }, { size: "39", stock: 25 }, { size: "40", stock: 22 }, { size: "41", stock: 18 }, { size: "42", stock: 15 }, { size: "43", stock: 10 }, { size: "44", stock: 6 }] },
    { name: "Vans Old Skool", brand: "Vans", category: "lifestyle", description: "O Vans Old Skool e classico da cultura skatista.", price: 349.90, discount_price: 299.90, featured: 0, image: "https://images.unsplash.com/photo-1525966222134-fcfa99b594ae?w=800&q=80", sizes: [{ size: "36", stock: 10 }, { size: "37", stock: 15 }, { size: "38", stock: 20 }, { size: "39", stock: 25 }, { size: "40", stock: 22 }, { size: "41", stock: 18 }, { size: "42", stock: 14 }, { size: "43", stock: 8 }, { size: "44", stock: 5 }] },
    { name: "Nike Air Max 270 React", brand: "Nike", category: "lifestyle", description: "O Nike Air Max 270 React combina duas tecnologias.", price: 999.90, featured: 1, image: "https://images.unsplash.com/photo-1597242210312-3a2e25f2cfcc?w=800&q=80", sizes: [{ size: "38", stock: 6 }, { size: "39", stock: 10 }, { size: "40", stock: 14 }, { size: "41", stock: 12 }, { size: "42", stock: 8 }, { size: "43", stock: 5 }, { size: "44", stock: 3 }] },
    { name: "Converse Chuck 70 High", brand: "Converse", category: "lifestyle", description: "O Converse Chuck 70 High e a versao premium do iconico.", price: 449.90, featured: 0, image: "https://images.unsplash.com/photo-1542183548-c0f0b4b06a8c?w=800&q=80", sizes: [{ size: "36", stock: 12 }, { size: "37", stock: 18 }, { size: "38", stock: 22 }, { size: "39", stock: 20 }, { size: "40", stock: 18 }, { size: "41", stock: 15 }, { size: "42", stock: 10 }, { size: "43", stock: 6 }, { size: "44", stock: 3 }] },
  ];
  let count = 0;
  for (const product of products) {
    const id = uuidv4();
    const images = JSON.stringify([product.image]);
    dbRun("INSERT INTO products (id, name, description, brand, category, price, discount_price, images, featured) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", [id, product.name, product.description, product.brand, product.category, product.price, product.discount_price || null, images, product.featured || 0]);
    for (const size of product.sizes) {
      dbRun("INSERT INTO product_sizes (id, product_id, size, stock) VALUES (?, ?, ?, ?)", [uuidv4(), id, size.size, size.stock]);
    }
    count++;
  }
  saveDatabase();
  console.log("Seeded " + count + " products with sizes.");
  console.log("Database seeding complete!");
}
seed().catch(function(err) {
  console.error("Seed failed:", err);
  process.exit(1);
});
