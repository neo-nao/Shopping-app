import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import { asyncUserFetch } from "./redux/user/userSlice";
import routes from "./routes";

function App() {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const UTK = localStorage.getItem("user-token");
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
