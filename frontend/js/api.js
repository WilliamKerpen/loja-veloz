const API_URL = "http://localhost:3000";

// Sanitização simples para evitar SQL injection
export function sanitize(text) {
    return text.replace(/[^a-zA-Z0-9À-ÿ\s]/g, "");
}

export async function getCategories() {
    const res = await fetch(`${API_URL}/categories`);
    return res.json();
}

export async function getProducts(categoryId = null, search = "") {
    const query = [];

    if (categoryId) query.push(`category_id=${categoryId}`);
    if (search) query.push(`search=${sanitize(search)}`);

    const res = await fetch(`${API_URL}/products?${query.join("&")}`);
    return res.json();
}
