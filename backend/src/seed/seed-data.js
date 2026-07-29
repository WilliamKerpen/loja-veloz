// Script para popular categorias e produtos
// Script to seed categories and products
// Executar: node src/seed/seed-data.js
// Run: node src/seed/seed-data.js

import { env } from "../config/env.js"; // usa a config centralizada

import pkg from "pg";
const { Pool } = pkg;

// Conexão com PostgreSQL usando env.js
// PostgreSQL connection using env.js
const pool = new Pool({
  connectionString: env.DATABASE_URL,
});

// Lista de categorias com imagens
// Category list with images
const categories = [
  { name: "Eletrônicos", image: "/img/eletronicos.png", description: "Produtos eletrônicos em geral" },
  { name: "Celulares", image: "/img/celulares.png", description: "Smartphones e acessórios" },
  { name: "Vestuário", image: "/img/vestuario.png", description: "Roupas e moda" },
  { name: "Livros", image: "/img/livros.png", description: "Livros e materiais de leitura" },
  { name: "Brinquedos", image: "/img/brinquedos.png", description: "Brinquedos e diversão" },
  { name: "Esportes", image: "/img/esportes.png", description: "Artigos esportivos" },
  { name: "Beleza", image: "/img/beleza.png", description: "Produtos de beleza e cuidados" },
  { name: "Cozinha", image: "/img/cozinha.png", description: "Itens para cozinha" },
  { name: "Automotivo", image: "/img/automotivo.png", description: "Produtos automotivos" },
  { name: "Informática", image: "/img/informatica.png", description: "Acessórios e hardware de informática" }
];

async function seed() {
  try {
    console.log("⏳ Inserindo categorias / Inserting categories...");

    for (const cat of categories) {
      // Inserir categoria e retornar ID
      // Insert category and return ID
      const result = await pool.query(
        `INSERT INTO category (name, description, image_url)
         VALUES ($1, $2, $3)
         RETURNING id`,
        [cat.name, cat.description, cat.image]
      );

      const categoryId = result.rows[0].id;

      console.log(`✔ Categoria criada / Category created: ${cat.name}`);
      console.log(`⏳ Inserindo produtos da categoria / Inserting products for category: ${cat.name}...`);

      // Criar 10 produtos por categoria
      // Create 10 products per category
      for (let i = 1; i <= 10; i++) {
        await pool.query(
          `INSERT INTO product (name, description, price, stock_quantity, image_url, category_id)
           VALUES ($1, $2, $3, $4, $5, $6)`,
          [
            `${cat.name} Produto ${i}`,
            `Descrição do produto ${i} da categoria ${cat.name}`,
            (Math.random() * 200 + 20).toFixed(2),
            Math.floor(Math.random() * 50) + 10,
            cat.image,
            categoryId
          ]
        );
      }

      console.log(`✔ Produtos inseridos / Products inserted for: ${cat.name}`);
    }

    console.log("🎉 Banco populado com sucesso / Database seeded successfully!");
  } catch (err) {
    console.error("Erro ao popular banco / Error seeding database:", err);
  } finally {
    pool.end();
  }
}

seed();