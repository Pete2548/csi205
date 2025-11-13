import "./App.css";
import AppLayout from "./layouts/Applayout.jsx";
import Animation from "./pages/Animation.jsx";
import Calculator from "./pages/Calculator.jsx";
import ForwardToHome from "./pages/ForwardToHome.jsx";
import Home from "./pages/Home.jsx";
import Components from "./pages/components.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Todos from "./pages/Todos.jsx";
import { useState, useEffect } from "react";
import { fetchProducts } from "./data/products.jsx";
import Products from "./pages/products.jsx";
import Carts from "./pages/carts.jsx";
import Login from "./login/login.jsx";


function App() {
  const [token, setToken] = useState('');

  const [products, setProducts] = useState([]);
  const [carts, setCarts] = useState([]);

  useEffect(() => setProducts(fetchProducts()), []);
  useEffect(() => console.log(products), [products]);

  if (token === "") {
    return <Login setToken={setToken}/>;
  } else {
    return (
      <BrowserRouter basename="/csi205/">
        <Routes>
          <Route element={<AppLayout products={products} carts={carts} setToken={setToken}/>}>
            <Route path="components" element={<Components />} />
            <Route path="home" element={<Home />} />
            <Route path="animation" element={<Animation />} />
            <Route path="calculator" element={<Calculator />} />
            <Route path="todos" element={<Todos />} />
            <Route
              path="products"
              element={
                <Products
                  products={products}
                  carts={carts}
                  setCarts={setCarts}
                />
              }
            />
            <Route
              path="carts"
              element={<Carts carts={carts} setCarts={setCarts} />}
            />
            <Route path="*" element={<ForwardToHome />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }
}
export default App;
