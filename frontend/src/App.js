import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoginScreen from "./screens/LoginScreen";
import ProfileScreen from "./screens/ProfileScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import OrderListScreen from "./screens/OrderListScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
const App = () => {
  return (
    <Router>
      <Header />

      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/login" element={<LoginScreen />} />

            <Route path="/admin/userlist" element={<UserListScreen />} />
            <Route path="/admin/user/:id/edit" element={<UserEditScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />

            <Route path="/cart/" element={<CartScreen />} />
            <Route path="/cart/:id" element={<CartScreen />} />

            <Route
              path="/admin/productslist"
              element={<ProductListScreen />}
              exact
            />
            <Route
              path="/admin/productslist/:pageNumber"
              element={<ProductListScreen />}
              exact
            />
            <Route path="/product/:id" element={<ProductScreen />} />
            <Route
              path="/admin/products/:id/edit"
              element={<ProductEditScreen />}
            />

            <Route path="/shipping" element={<ShippingScreen />} />

            <Route path="/placeorder" element={<PlaceOrderScreen />} />
            <Route path="/orders/:id" element={<OrderScreen />} />
            <Route
              path="/admin/orderlist"
              element={<OrderListScreen />}
              exact
            />
            <Route
              path="/admin/orderlist/:pageNumber"
              element={<OrderListScreen />}
              exact
            />
            <Route path="/payment" element={<PaymentScreen />} />

            <Route path="/search/:keyword" element={<HomeScreen />} exact />
            <Route path="/page/:pageNumber" element={<HomeScreen />} exact />
            <Route
              path="/search/:keyword/page/:pageNumber"
              element={<HomeScreen />}
            />
            <Route path="/" element={<HomeScreen />} exact />
          </Routes>
        </Container>
      </main>

      <Footer />
    </Router>
  );
};

export default App;
