// Controlador de produtos / Product controller
// Recebe requisições HTTP e envia respostas / Receives HTTP requests and sends responses

import * as service from "./product.service.js";

// Listar produtos / List products
export async function list(req, res) {
    try {
        // Captura filtros da URL / Capture filters from URL
        const { category_id, search } = req.query;

        // Envia filtros ao service / Send filters to service
        const products = await service.listProducts(category_id, search);

        res.json(products);
    } catch (err) {
        res.status(500).json({ error: "Erro ao listar produtos / Error listing products" });
    }
}

// Buscar produto por ID / Get product by ID
export async function get(req, res) {
    try {
        const product = await service.getProduct(req.params.id);
        if (!product)
            return res.status(404).json({ error: "Produto não encontrado / Product not found" });

        res.json(product);
    } catch (err) {
        res.status(500).json({ error: "Erro ao buscar produto / Error fetching product" });
    }
}

// Criar produto / Create product
export async function create(req, res) {
    try {
        const product = await service.addProduct(req.body);
        res.status(201).json(product);
    } catch (err) {
        res.status(500).json({ error: "Erro ao criar produto / Error creating product" });
    }
}

// Atualizar produto / Update product
export async function update(req, res) {
    try {
        const product = await service.editProduct(req.params.id, req.body);
        if (!product)
            return res.status(404).json({ error: "Produto não encontrado / Product not found" });

        res.json(product);
    } catch (err) {
        res.status(500).json({ error: "Erro ao atualizar produto / Error updating product" });
    }
}

// Remover produto / Delete product
export async function remove(req, res) {
    try {
        const product = await service.removeProduct(req.params.id);
        if (!product)
            return res.status(404).json({ error: "Produto não encontrado / Product not found" });

        res.json({ message: "Produto removido com sucesso / Product removed successfully" });
    } catch (err) {
        res.status(500).json({ error: "Erro ao remover produto / Error deleting product" });
    }
}
