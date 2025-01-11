import { useEffect, useState } from "react";
import { getUserHoldings } from "../../api/apiService";
import StockCard from "../../components/StockCard";

const StocksFavoritos = ({ buy }) => {
  const [holdings, setHoldings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const userId = 1; // Se debe de actualizar con la autentificación

  useEffect(() => {
    const fetchHoldings = async () => {
      try {
        const data = await getUserHoldings(userId);
        setHoldings(data);
      } catch (err) {
        setError("Error al obtener los stocks favoritos");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHoldings();
  }, [userId, buy]);

  if (loading) return <p>Cargando stocks favoritos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="stocks-favoritos-container">
      <h1>Mis Stocks Favoritos</h1>
      {holdings.length > 0 ? (
        <div className="stocks-grid">
          {holdings.map((stock) => (
            <StockCard key={stock.id} stock={stock} userId={userId} />
          ))}
        </div>
      ) : (
        <p>No tienes stocks comprados aún.</p>
      )}
    </div>
  );
};

export default StocksFavoritos;
