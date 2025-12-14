
export interface Product {
    id: number;
    code: string;
    name: string;
    type: 'procesor' | 'karta graficzna' | 'pamięć ram' | 'dysk';
    price: number;
    amount: number;
    description: string;
    date: string;
    image: string;
}

import data from '../data/products.json';
const allProducts: Product[] = data as Product[];



export const getAllProducts = (): Product[] => {
    return allProducts;
};

export const getProductsAlphabetically = (): Product[] => {
    return [...allProducts].sort((a, b) => a.name.localeCompare(b.name));
};

export const getProductsByNewest = (): Product[] => {
    return [...allProducts].sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
};

export const getAvailableProducts = (): Product[] => {
    return allProducts.filter(product => product.amount > 0);
};

export const getOutOfStockProducts = (): Product[] => {
    return allProducts.filter(product => product.amount === 0);
};

export const getProductsByCategory = (category: Product['type']): Product[] => {
    return allProducts.filter(product => product.type === category);
};

export const getProductById = (id: number): Product | undefined => {
    return allProducts.find(product => product.id === id);
};