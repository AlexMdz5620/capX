import { useEffect, useState } from "react";
import { fetchTickersData } from "../../api/alphaVantageApi";
import { addStockHolding } from "../../api/apiService";
import StocksFavoritos from "../Stocks/StocksFavoritos";

const Dashboard = () => {
  const [tickers, setTickers] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [counter, setCounter] = useState({});
  const [error, setError] = useState("");
  const [buy, setBuy] = useState(false);
  const userId = 1; // Se debe de actualizar con la autentificación

  // Tickers más famosos
  const allTickers = [
    "AAPL", "MSFT", "GOOGL", "AMZN", "TSLA", "NFLX", "META", "NVDA", "AMD", "BABA",
    "INTC", "ORCL", "CSCO", "PYPL", "ADBE", "QCOM", "UBER", "LYFT", "SHOP", "ZM",
  ];

  useEffect(() => {
    const loadTickers = async () => {
      if (loading) return;
      setLoading(true);
      try {
        const start = (page - 1) * 5;
        const end = start + 5;
        const data = await fetchTickersData(allTickers.slice(start, end));
        setTickers((prev) => [...prev, ...data]);
      } catch (err) {
        setError("Error al cargar tickers. Inténtalo de nuevo.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadTickers();
  }, [page]);

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (scrollTop + clientHeight >= scrollHeight - 5 && !loading) {
      setPage((prev) => prev + 1);
    }
  };

  const incrementCounter = (symbol) => {
    setCounter((prev) => ({
      ...prev,
      [symbol]: (prev[symbol] || 0) + 1,
    }));
  };

  const decrementCounter = (symbol) => {
    setCounter((prev) => ({
      ...prev,
      [symbol]: Math.max((prev[symbol] || 0) - 1, 0),
    }));
  };

  const handleBuy = async (ticker) => {
    const quantity = counter[ticker.symbol] || 0;
    if (quantity === 0) {
      alert("Selecciona una cantidad mayor a 0");
      return;
    }

    try {
      await addStockHolding(userId, {
        ticker: ticker.symbol,
        quantity,
        buyPrice: ticker.price,
      });
      alert("Compra realizada con éxito");
      setCounter((prev) => ({ ...prev, [ticker.symbol]: 0 }));
      setBuy(true)
    } catch (err) {
      setError("No se pudo completar la compra. Inténtalo más tarde.");
      console.log(err);
    } finally {
      setBuy(false);
    }
  };

  const filteredTickers = tickers.filter((ticker) =>
    ticker.symbol.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="dashboard-container">
      <input
        type="text"
        placeholder="Buscar ticker..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="filter-input"
      />
      <div className="scroll-container" onScroll={handleScroll}>
        {filteredTickers.map((ticker) => (
          <div key={ticker.symbol} className="ticker-card">
            <h3>{ticker.symbol}</h3>
            <p>Precio: ${ticker.price}</p>
            <div className="counter-container">
              <button onClick={() => decrementCounter(ticker.symbol)}>-</button>
              <span>{counter[ticker.symbol] || 0}</span>
              <button onClick={() => incrementCounter(ticker.symbol)}>+</button>
            </div>
            <button onClick={() => handleBuy(ticker)}>Comprar</button>
          </div>
        ))}
        {loading && <p>Cargando más datos...</p>}
        {error && <p className="error-message">{error}</p>}
      </div>
      <StocksFavoritos buy={buy}/>
    </div>
  );
};

export default Dashboard;
