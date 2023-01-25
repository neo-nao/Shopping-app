import { useEffect } from "react";
import { useLocation } from "wouter";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "wouter";
import { asyncUserFetch } from "./redux/user/userSlice";
import routes from "./routes";
import Layout from "./layout/Layout";
import NestedRoutes from "./container/NestedRoutes/NestedRoutes";

function App() {
  const [, navigate] = useLocation();

  const user = useSelector((state) => state.user.user);

  const dispatch = useDispatch();

  useEffect(() => {
    const UTK = localStorage.getItem("user-token");
    !user && UTK && dispatch(asyncUserFetch({ UTK }));
  }, []);

  return (
    <Layout>
      <Switch>
        {routes.map(({ id, path, nested, Element, ...rest }) =>
          !nested ? (
            <Route key={id} path={path} {...rest} />
          ) : (
            <NestedRoutes key={id} path={path}>
              <Element navigate={navigate} />
            </NestedRoutes>
          )
        )}
      </Switch>
    </Layout>
  );
}

export default App;
