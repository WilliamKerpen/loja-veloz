// Controlador de categorias / Category controller
// Recebe requisições HTTP e envia respostas / Receives HTTP requests and sends responses

import * as service from "./category.service.js";

// Listar categorias / List categories
export async function list(req, res) {
  try {
    const categories = await service.listCategories();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: "Erro ao listar categorias / Error listing categories" });
  }
}

// Buscar categoria por ID / Get category by ID
export async function get(req, res) {
  try {
    const category = await service.getCategory(req.params.id);
    if (!category)
      return res.status(404).json({ error: "Categoria não encontrada / Category not found" });

    res.json(category);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar categoria / Error fetching category" });
  }
}

// Criar categoria / Create category
export async function create(req, res) {
  try {
    const category = await service.addCategory(req.body);
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ error: "Erro ao criar categoria / Error creating category" });
  }
}

// Atualizar categoria / Update category
export async function update(req, res) {
  try {
    const category = await service.editCategory(req.params.id, req.body);
    if (!category)
      return res.status(404).json({ error: "Categoria não encontrada / Category not found" });

    res.json(category);
  } catch (err) {
    res.status(500).json({ error: "Erro ao atualizar categoria / Error updating category" });
  }
}

// Remover categoria / Delete category
export async function remove(req, res) {
  try {
    const category = await service.removeCategory(req.params.id);
    if (!category)
      return res.status(404).json({ error: "Categoria não encontrada / Category not found" });

    res.json({ message: "Categoria removida com sucesso / Category removed successfully" });
  } catch (err) {
    res.status(500).json({ error: "Erro ao remover categoria / Error deleting category" });
  }
}
