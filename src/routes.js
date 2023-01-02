import HomePage from "./pages/HomePage/HomePage";
import ProductsPage from "./pages/ProductsPage/ProductsPage";
import SpecialOffersPage from "./pages/SpecialOffersPage/SpecialOffersPage";
import CartPage from "./pages/CartPage/CartPage";
import ManageAccountPage from "./pages/ManageAccountPage/ManageAccountPage";
import AboutUsPage from "./pages/AboutUsPage/AboutUsPage";
import AuthPage from "./pages/AuthPage/AuthPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

const routes = [
  { id: 1, path: "/", element: (props) => <HomePage {...props} /> },
  { id: 2, path: "/products", element: (props) => <ProductsPage {...props} /> },
  {
    id: 3,
    path: "/special-offers",
    element: (props) => <SpecialOffersPage {...props} />,
  },
  { id: 4, path: "/cart", element: (props) => <CartPage {...props} /> },
  {
    id: 5,
    path: "/manage-account",
    element: (props) => <ManageAccountPage {...props} />,
  },
  { id: 6, path: "/about-us", element: (props) => <AboutUsPage {...props} /> },
  { id: 7, path: "/auth/*", element: (props) => <AuthPage {...props} /> },
  { id: 8, path: "*", element: (props) => <NotFoundPage {...props} /> },
];

export default routes;
