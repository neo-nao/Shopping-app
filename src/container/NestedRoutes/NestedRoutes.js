import { Router, useLocation, useRouter } from "wouter";

const NestedRoutes = ({ path, nestedPath, children }) => {
  const [location] = useLocation();
  const router = useRouter();

  const nestedBase = `${router.base}${location}`;

  const nestedPathIndex = path.slice(1).indexOf("/");

  const mainPath = path.slice(0, nestedPathIndex + 1);

  return (
    <Router key={nestedBase} base={mainPath}>
      {children}
    </Router>
  );
};

export default NestedRoutes;
