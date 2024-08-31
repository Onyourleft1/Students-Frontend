import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage/Homepage";
import Header from "./components/Header/Header";
import React, { useEffect, useState } from "react";
import axios from "axios";
import AboutUs from "./components/AboutUs/AboutUs";
import ContactUs from "./components/ContactUs/ContactUs";
import ProductPage from "./components/ProductPage/ProductPage";
import Login from "./components/Login/Login";
import { CookiesProvider, useCookies } from "react-cookie";
import Cart from "./components/Cart/Cart";
import Page404 from "./components/Page404/Page404";

export const ProductContext = React.createContext();
export const LoginContext = React.createContext();
export const UserContext = React.createContext();

function App() {
  const [cookies] = useCookies(["token"]);
  const [products, setProducts] = useState([]);
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    if (cookies.token) {
      axios
        .post(`${process.env.REACT_APP_BACK_URL}/users/getLoginInfo`, {
          token: cookies.token,
        })
        .then((res) => {
          setLogin(true);
          setUser(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      setLogin(false);
      setUser({});
    }
  }, [cookies]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACK_URL}/Products/get`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((err) => [console.error(err.response)]);
  }, []);

  return (
    <div className="App">
      <CookiesProvider>
        <LoginContext.Provider value={[login, setLogin]}>
          <UserContext.Provider value={[user, setUser]}>
            <ProductContext.Provider value={[products, setProducts]}>
              <BrowserRouter>
                <Header />
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/" element={<Homepage />} />
                  <Route path="/about" element={<AboutUs />} />
                  <Route path="/contact" element={<ContactUs />} />
                  {products.map((product, index) => {
                    return (
                      <Route
                        key={index}
                        path={`/products/${product.name}`}
                        element={<ProductPage product={product} />}
                      />
                    );
                  })}
                  {login ? <Route path="/cart" element={<Cart />} /> : <></>}
                  <Route path="*" element={<Page404 />} />
                </Routes>
              </BrowserRouter>
            </ProductContext.Provider>
          </UserContext.Provider>
        </LoginContext.Provider>
      </CookiesProvider>
    </div>
  );
}

export default App;
