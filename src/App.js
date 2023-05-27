import { useEffect } from "react";
import { useLocation } from "wouter";
import { useDispatch } from "react-redux";
import { Route, Switch } from "wouter";
import routes from "./routes";
import Layout from "./layout/Layout";
import NestedRoutes from "./container/NestedRoutes/NestedRoutes";
import { login } from "./redux/user/userSlice";

function App() {
  const [, navigate] = useLocation();

  const dispatch = useDispatch();

  useEffect(() => {
    const userAccount = JSON.parse(localStorage.getItem("user-account"));

    userAccount && userAccount.isLogged && dispatch(login(userAccount));
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
