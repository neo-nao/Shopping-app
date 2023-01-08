import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { asyncUserFetch } from "./redux/user/userSlice";
import routes from "./routes";
import Layout from "./layout/Layout";
import { showAlert } from "./redux/alert/alertSlice";

function App() {
  const user = useSelector((state) => state.user.user);

  const dispatch = useDispatch();

  useEffect(() => {
    const UTK = localStorage.getItem("user-token");
    !user && UTK && dispatch(showAlert({ title: "test", paragraph: UTK }));
    !user && UTK && dispatch(asyncUserFetch({ UTK }));
  }, []);

  return (
    <Layout>
      <Routes>
        {routes.map(({ id, ...rest }) => (
          <Route key={id} {...rest} />
        ))}
      </Routes>
    </Layout>
  );
}

export default App;
