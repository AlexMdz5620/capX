import { deleteStockHolding } from "../api/apiService";
import { getStockOverview } from "../api/alphaVantageApi";

const StockCard = ({ stock, userId, onDelete }) => {
  // Eliminar stock
  const handleDelete = async () => {
    if (!userId) return alert("Usuario no autenticado.");

    try {
      await deleteStockHolding(userId, stock.id); 
      alert(`Stock "${stock.name}" eliminado correctamente`);
      if (onDelete) onDelete(stock.id); 
    } catch (err) {
      console.error("Error al eliminar el stock:", err);
      alert("No se pudo eliminar el stock");
    }
  };

  // Mostrar info de un stock
  const handleViewDetails = async () => {
    if (!userId) return alert("Usuario no autenticado.");
  
    try {
      const details = await getStockOverview(stock.ticker); 
      console.log(details);
      alert(`Detalles del stock:
        Símbolo: ${details.ticker || "N/A"}
        Sector: ${details.Sector || "N/A"}
        Industria: ${details.Industry || "N/A"}
        Descripción: ${details.Description || "N/A"}
      `);
    } catch (err) {
      alert("No se pudo obtener los detalles del stock.");
      console.error(err);
    }
  };
  

  return (
    <div className="stock-card">
      <h3>{stock.name}</h3>
      <p>Ticker: {stock.ticker}</p>
      <p>Precio: ${stock.buyPrice}</p>
      <p>Cantidad: {stock.quantity}</p>
      <p>Total: ${stock.quantity * stock.buyPrice}</p>
      <div className="stock-card-actions">
        <button onClick={handleViewDetails} className="details-button">
          Ver detalles
        </button>
        <button onClick={handleDelete} className="delete-button">
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default StockCard;
