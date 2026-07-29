// Repositório de categorias / Category repository
// Responsável por acessar o banco de dados / Responsible for accessing the database

import { db } from "../../config/database.js";

// Buscar todas as categorias / Fetch all categories
export async function getAllCategories() {
  const query = "SELECT * FROM category ORDER BY id DESC";
  const result = await db.query(query);
  return result.rows;
}

// Buscar categoria por ID / Fetch category by ID
export async function getCategoryById(id) {
  const query = "SELECT * FROM category WHERE id = $1";
  const result = await db.query(query, [id]);
  return result.rows[0];
}

// Criar categoria / Create category
export async function createCategory({ name, description, imageUrl }) {
  const query = `
    INSERT INTO category (name, description, image_url)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const result = await db.query(query, [name, description, imageUrl]);
  return result.rows[0];
}

// Atualizar categoria / Update category
export async function updateCategory(id, { name, description, imageUrl }) {
  const query = `
    UPDATE category
    SET name = $1, description = $2, image_url = $3
    WHERE id = $4
    RETURNING *;
  `;
  const result = await db.query(query, [name, description, imageUrl, id]);
  return result.rows[0];
}

// Deletar categoria / Delete category
export async function deleteCategory(id) {
  const query = "DELETE FROM category WHERE id = $1 RETURNING *;";
  const result = await db.query(query, [id]);
  return result.rows[0];
}
