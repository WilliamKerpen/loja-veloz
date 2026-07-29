// Serviço de produtos / Product service
// Contém regras de negócio / Contains business logic

import * as repo from "./product.repository.js";

// Listar produtos com filtros / List products with filters
export async function listProducts(categoryId = null, search = "") {
    // Encaminha filtros para o repositório
    // Pass filters to repository
    return await repo.getProductsFiltered(categoryId, search);
}

// Buscar produto / Get product
export async function getProduct(id) {
    return await repo.getProductById(id);
}

// Criar produto / Create product
export async function addProduct(data) {
    return await repo.createProduct(data);
}

// Atualizar produto / Update product
export async function editProduct(id, data) {
    return await repo.updateProduct(id, data);
}

// Remover produto / Remove product
export async function removeProduct(id) {
    return await repo.deleteProduct(id);
}
