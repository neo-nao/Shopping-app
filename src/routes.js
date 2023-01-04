import HomePage from "./pages/HomePage/HomePage";
import ProductsPage from "./pages/ProductsPage/ProductsPage";
import SpecialOffersPage from "./pages/SpecialOffersPage/SpecialOffersPage";
import CartPage from "./pages/CartPage/CartPage";
import ManageAccountPage from "./pages/ManageAccountPage/ManageAccountPage";
import AboutUsPage from "./pages/AboutUsPage/AboutUsPage";
import AuthPage from "./pages/AuthPage/AuthPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

const routes = [
  { id: 1, path: "/", element: <HomePage /> },
  { id: 2, path: "/products", element: <ProductsPage /> },
  {
    id: 3,
    path: "/special-offers",
    element: <SpecialOffersPage />,
  },
  { id: 4, path: "/cart", element: <CartPage /> },
  {
    id: 5,
    path: "/manage-account",
    element: <ManageAccountPage />,
  },
  { id: 6, path: "/about-us", element: <AboutUsPage /> },
  { id: 7, path: "/auth/*", element: <AuthPage /> },
  { id: 8, path: "*", element: <NotFoundPage /> },
];

export default routes;
