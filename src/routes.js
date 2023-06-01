import HomePage from "./pages/HomePage/HomePage";
import ProductsPage from "./pages/ProductsPage/ProductsPage";
import SpecialOffersPage from "./pages/SpecialOffersPage/SpecialOffersPage";
import CartPage from "./pages/CartPage/CartPage";
import ManageAccountPage from "./pages/ManageAccountPage/ManageAccountPage";
import AboutUsPage from "./pages/AboutUsPage/AboutUsPage";
import AuthPage from "./pages/AuthPage/AuthPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import ProductOverview from "./pages/ProductOverview/ProductOverview";
import AnjamMidam from "./pages/AnjamMidam/AnjamMidam";

const routes = [
  { id: 1, path: "/", component: HomePage },
  { id: 2, path: "/products", component: ProductsPage },
  { id: 2, path: "/products/:id", component: ProductOverview },
  {
    id: 3,
    path: "/special-offers",
    component: SpecialOffersPage,
  },
  { id: 4, path: "/cart", component: CartPage },
  {
    id: 5,
    path: "/manage-account",
    component: ManageAccountPage,
  },
  { id: 6, path: "/about-us", component: AboutUsPage },
  {
    id: 7,
    path: "/auth/:method",
    nested: true,
    Element: AuthPage,
  },
  {
    id: 8,
    path: "/anjam-midam",
    component: AnjamMidam,
  },
  { id: 9, component: NotFoundPage },
];

export default routes;
