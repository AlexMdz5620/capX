import axios from "axios";

const API_BASE_URL = "https://www.alphavantage.co/query";
const SECRET_KEY = import.meta.env.VITE_ALPHA_VANTAGE_KEY;

// Fetch de los datos de Alpha Vantage para el Dashboard
export const fetchTickersData = async (tickers = [], limit = 5) => {
    const limitedTickers = tickers.slice(0, limit);
    try {
        const requests = limitedTickers.map((ticker) =>
            axios.get(API_BASE_URL, {
                params: {
                    function: "GLOBAL_QUOTE",
                    symbol: ticker,
                    apikey: SECRET_KEY,
                },
            })
        );

        const responses = await Promise.all(requests);
        return responses
            .map((response) => response.data["Global Quote"])
            .filter((data) => data && Object.keys(data).length > 0)
            .map((data) => ({
                symbol: data["01. symbol"],
                price: data["05. price"],
                change: data["10. change percent"],
            }));
    } catch (err) {
        console.error("Error fetching ticker data:", err);
        throw new Error("Failed to fetch tickers data.");
    }
};
// Fetch de un solo Stock
export const getStockOverview = async (symbol) => {
    try {
      const endpoint = `${API_BASE_URL}?function=OVERVIEW&symbol=${symbol}&apikey=${SECRET_KEY}`;
      const response = await fetch(endpoint);
  
      if (!response.ok) {
        throw new Error("Error en la respuesta del servidor.");
      }
  
      const data = await response.json();
  
      if (Object.keys(data).length === 0) {
        throw new Error("No se encontraron detalles para este stock.");
      }
  
      return data;
    } catch (error) {
      console.error("Error al obtener detalles del stock desde Alpha Vantage:", error);
      throw error;
    }
  };