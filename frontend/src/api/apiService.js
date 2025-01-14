import axios from "axios";

const API = axios.create({
  baseURL: "https://capx-suc9.onrender.com", // Cambiar para producción si es necesario
});

// Funciones de usuario
export const loginUser = async (credentials) => {
    try {
        const response = await API.post("/users/login", credentials);
        return response.data;
    } catch (error) {
        throw error.response?.data || "Error en el servidor";
    }
};

export const registerUser = async (formData) => {
    try {
        const response = await API.post("/users/register", formData);
        return response.data;
    } catch (error) {
        throw error.response?.data || "Error en el servidor";
    }
};

// Funciones de stocks
// Traer todos los stocks comprados por el usuario
export const getUserHoldings = async (userId) => {
    try {
        const response = await API.get(`/users/${userId}/holdings`);
        return response.data;
    } catch (error) {
        throw error.response?.data || "Error al obtener las tenencias";
    }
};

// Añadir stocks al be
export const addStockHolding = async (userId, holding) => {
    try {
        const response = await API.post(`/users/${userId}/holdings`, holding);
        return response.data;
    } catch (error) {
        throw error.response?.data || "Error al añadir tenencia";
    }
};

// Actualizar el número de compras
export const updateStockHolding = async (userId, holdingId, holding) => {
    try {
        const response = await API.put(`/users/${userId}/holdings/${holdingId}`, holding);
        return response.data;
    } catch (error) {
        throw error.response?.data || "Error al actualizar tenencia";
    }
};

// Eliminar un Stock
export const deleteStockHolding = async (userId, holdingId) => {
    try {
        const response = await API.delete(`/users/${userId}/holdings/${holdingId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || "Error al eliminar tenencia";
    }
};
