import https from 'https';
import fetch, { type RequestInit } from 'node-fetch';
import { type Product } from './types'; // Adjust the path as necessary

const API_BASE_URL = 'https://localhost:44350/api';

// Create an HTTPS agent that ignores self-signed certificates
const agent = new https.Agent({
    rejectUnauthorized: false,
});

const fetchWithAgent = (url: string, options: RequestInit = {}) => {
    return fetch(url, { ...options, agent });
};

export const getProducts = async (): Promise<Product[]> => {
    const response = await fetchWithAgent(`${API_BASE_URL}/Product/RetrieveAll`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json() as Promise<Product[]>;
};

export const getProductById = async (id: number): Promise<Product> => {
    const response = await fetchWithAgent(`${API_BASE_URL}/Product/ObtenerId?id=${id}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json() as Promise<Product>;
};

export const createProduct = async (product: Product): Promise<Product> => {
    const response = await fetchWithAgent(`${API_BASE_URL}/Product/CreateProducto`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json() as Promise<Product>;
};

export const updateProduct = async (id: number, product: Product): Promise<Product> => {
    const response = await fetchWithAgent(`${API_BASE_URL}/Product/ActualizarProducto?id=${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json() as Promise<Product>;
};

export const deleteProduct = async (id: number): Promise<void> => {
    const response = await fetchWithAgent(`${API_BASE_URL}/Product/EliminarProducto?id=${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
};
