import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { asyncUserFetch } from "./redux/user/userSlice";
import routes from "./routes";
import Layout from "./layout/Layout";
import { getAsyncProducts } from "./redux/prodcuts/productsSlice";

function App() {
  const user = useSelector((state) => state.user.user);

  const { loading, error, products } = useSelector((state) => state.products);

  const dispatch = useDispatch();

  useEffect(() => {
    const UTK = localStorage.getItem("user-token");
    !user && UTK && dispatch(asyncUserFetch({ UTK }));
  }, []);

  const renderRoutes = () => {
    return routes.map(({ id, path, element }) => {
      let props = {};

      switch (path) {
        case "/products":
          props = {
            productsFetchState: { loading, error, products },
            getAsyncProducts,
          };
          break;
        default:
      }

      return <Route key={id} path={path} element={element(props)} />;
    });
  };

  return (
    <Layout>
      <Routes>{renderRoutes()}</Routes>
    </Layout>
  );
}

export default App;
