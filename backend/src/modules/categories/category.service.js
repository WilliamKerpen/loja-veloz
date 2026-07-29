// Serviço de categorias / Category service
// Contém regras de negócio / Contains business logic

import * as repo from "./category.repository.js";

// Listar categorias / List categories
export async function listCategories() {
  return await repo.getAllCategories();
}

// Buscar categoria / Get category
export async function getCategory(id) {
  return await repo.getCategoryById(id);
}

// Criar categoria / Create category
export async function addCategory(data) {
  return await repo.createCategory(data);
}

// Atualizar categoria / Update category
export async function editCategory(id, data) {
  return await repo.updateCategory(id, data);
}

// Remover categoria / Remove category
export async function removeCategory(id) {
  return await repo.deleteCategory(id);
}
