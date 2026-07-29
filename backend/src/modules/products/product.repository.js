// Repositório de produtos / Product repository
// Responsável por acessar o banco de dados / Responsible for accessing the database

import { db } from "../../config/database.js";

// Buscar todos os produtos / Fetch all products
export async function getAllProducts() {
    const query = `
        SELECT p.*, c.name AS category_name
        FROM product p
        LEFT JOIN category c ON c.id = p.category_id
        ORDER BY p.id DESC;
    `;
    const result = await db.query(query);
    return result.rows;
}

// Buscar produtos com filtros / Fetch products with filters
export async function getProductsFiltered(categoryId = null, search = "") {
    let query = `
        SELECT p.*, c.name AS category_name
        FROM product p
        LEFT JOIN category c ON c.id = p.category_id
        WHERE 1=1
    `;

    const params = [];
    let index = 1;

    // Filtro por categoria / Category filter
    if (categoryId) {
        query += ` AND p.category_id = $${index++}`;
        params.push(categoryId);
    }

    // Filtro por busca / Search filter
    if (search) {
        query += ` AND p.name ILIKE $${index++}`;
        params.push(`%${search}%`);
    }

    query += " ORDER BY p.id DESC";

    const result = await db.query(query, params);
    return result.rows;
}

// Buscar produto por ID / Fetch product by ID
export async function getProductById(id) {
    const query = `
        SELECT p.*, c.name AS category_name
        FROM product p
        LEFT JOIN category c ON c.id = p.category_id
        WHERE p.id = $1;
    `;
    const result = await db.query(query, [id]);
    return result.rows[0];
}

// Criar produto / Create product
export async function createProduct({ name, description, price, stockQuantity, imageUrl, categoryId }) {
    const query = `
        INSERT INTO product (name, description, price, stock_quantity, image_url, category_id)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;
    `;
    const result = await db.query(query, [
        name,
        description,
        price,
        stockQuantity,
        imageUrl,
        categoryId
    ]);
    return result.rows[0];
}

// Atualizar produto / Update product
export async function updateProduct(id, { name, description, price, stockQuantity, imageUrl, categoryId }) {
    const query = `
        UPDATE product
        SET name = $1, description = $2, price = $3, stock_quantity = $4, image_url = $5, category_id = $6
        WHERE id = $7
        RETURNING *;
    `;
    const result = await db.query(query, [
        name,
        description,
        price,
        stockQuantity,
        imageUrl,
        categoryId,
        id
    ]);
    return result.rows[0];
}

// Deletar produto / Delete product
export async function deleteProduct(id) {
    const query = "DELETE FROM product WHERE id = $1 RETURNING *;";
    const result = await db.query(query, [id]);
    return result.rows[0];
}
