import { BrowserRouter, Routes, Route, Outlet, useParams } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import MarketingPage from './pages/MarketingPage';
import MenuPage from './pages/MenuPage';
import CartPage from './pages/CartPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import NotFoundPage from './pages/NotFoundPage';
import './styles/global.css';

/**
 * Route boundary wrapper that provides restaurant-isolated cart state
 * based on the active restaurantSlug parameter.
 */
function RestaurantCartScope() {
  const { restaurantSlug = 'buna-bite' } = useParams();

  return (
    <CartProvider currentRestaurantSlug={restaurantSlug}>
      <Outlet />
    </CartProvider>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 1. Public Product Marketing Landing Page */}
        <Route path="/" element={<MarketingPage />} />

        {/* 2. Restaurant Customer Experience (scoped with CartProvider) */}
        <Route path="/r/:restaurantSlug" element={<RestaurantCartScope />}>
          <Route index element={<MenuPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="order/:orderId" element={<OrderConfirmationPage />} />
        </Route>

        {/* 3. 404 Catch-All Route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
