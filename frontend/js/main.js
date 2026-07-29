// Importa funções da API
// Imports API functions
import { getCategories, getProducts } from "./api.js";

// Referências aos elementos do DOM
// DOM element references
const categoryList = document.getElementById("categoryList");
const productList = document.getElementById("productList");
const searchInput = document.getElementById("searchInput");
const btnSearch = document.getElementById("btnSearch");

// URL base do backend
// Backend base URL
const API_BASE_URL = "http://localhost:3000";

// Carrega categorias no menu
// Loads categories into the menu
async function loadCategories() {
    const categories = await getCategories();

    categoryList.innerHTML = "";

    categories.forEach(cat => {
        const div = document.createElement("div");
        div.className = "category-item";
        div.innerText = cat.name;

        // Ao clicar, carrega produtos da categoria
        // On click, loads products from the selected category
        div.onclick = () => loadProducts(cat.id);

        categoryList.appendChild(div);
    });
}

// Carrega produtos na tela
// Loads products on the screen
async function loadProducts(categoryId = null, search = "") {
    const products = await getProducts(categoryId, search);

    productList.innerHTML = "";

    products.forEach(prod => {
        const card = document.createElement("div");
        card.className = "product-card";

        // Monta URL completa da imagem
        // Builds full image URL
        const imageSrc = `${API_BASE_URL}${prod.image_url}`;

        console.log(imageSrc) 

        card.innerHTML = `
            <img src="${imageSrc}" alt="${prod.name}">
            <h3>${prod.name}</h3>
            <p>${prod.description}</p>
            <div class="price">R$ ${prod.price}</div>
        `;

        // Botão de adicionar ao carrinho
        // Add-to-cart button
        const btn = document.createElement("button");
        btn.innerText = "Adicionar ao carrinho";
        btn.className = "add-cart-btn";

        btn.onclick = () => addToCart(prod);

        card.appendChild(btn);
        productList.appendChild(card);
    });
}

// Evento de busca
// Search event
btnSearch.onclick = () => {
    const text = searchInput.value;
    loadProducts(null, text);
};

// Carrinho simples em memória
// Simple in-memory cart
let cart = [];

// Adiciona produto ao carrinho
// Adds product to cart
function addToCart(product) {
    cart.push(product);
    document.getElementById("cartCount").innerText = cart.length;
}

// Inicialização da página
// Page initialization
loadCategories();
loadProducts();
