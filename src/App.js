import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { asyncUserFetch } from "./redux/user/userSlice";
import routes from "./routes";
import { getAsyncProducts } from "./redux/prodcuts/productsSlice";
import Layout from "./layout/Layout";

function App() {
  const user = useSelector((state) => state.user.user);

  const { loading, error, products } = useSelector((state) => state.products);

  const dispatch = useDispatch();

  const [dynamicURL, setDynamicURL] = useState(null);

  const handleDynamicURL = (val) => setDynamicURL(val);

  useEffect(() => {
    const UTK = localStorage.getItem("user-token");
    !user && UTK && dispatch(asyncUserFetch({ UTK }));
  }, []);

  const productsFetchFunc = () => {
    dispatch(getAsyncProducts(dynamicURL));
  };

  const renderRoutes = () => {
    return routes.map(({ id, path, element }) => {
      let props = {};

      switch (path) {
        case "/products":
          props = {
            productsFetchState: { loading, error, products },
            productsFetchFunc,
            filterURL: { dynamicURL, handleDynamicURL },
          };
          break;
        case "/special-offers":
          props = {
            filterURL: { dynamicURL, handleDynamicURL },
          };
          break;
        default:
      }

      return <Route key={id} path={path} element={element(props)} />;
    });
  };

  console.log("render");

  return (
    <Layout>
      <Routes>{renderRoutes()}</Routes>
    </Layout>
  );
}

export default App;
