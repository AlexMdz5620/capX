import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./features/Auth/Login";
import Register from "./features/Auth/Register";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./styles/App.css";

const Layout = ({ children }) => (
  <div className="layout-container">
    <Header />
    <main>{children}</main>
    <Footer />
  </div>
);

function App() {
  return (
    <div>
      <Router>
        <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>

        </Layout>
      </Router>
    </div>
  );
}

export default App;
