import { Router, useLocation, useRoute } from "wouter";

const NestedRoutes = ({ path, nestedPath, children }) => {
  const [location] = useLocation();
  const [, params = null] = useRoute("/auth/:method");

  const nestedBase = `${path}${params.method ? "/" + params.method : ""}`;

  console.log(nestedBase);

  if (!location.startsWith(path)) return null;

  return (
    <Router key={nestedBase} base={path}>
      {children}
    </Router>
  );
};

export default NestedRoutes;
