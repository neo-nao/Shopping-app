import { useSelector } from "react-redux";
import ProductsPage from "../ProductsPage/ProductsPage";
import { getAsyncSpecialOffers } from "../../redux/specialOffers/specialOffersSlice";

const SpecialOffersPage = () => {
  const { loading, error, products } = useSelector(
    (state) => state.specialOffers
  );

  return (
    <ProductsPage
      productsFetchState={{ loading, error, products }}
      getAsyncProducts={getAsyncSpecialOffers}
    />
  );
};

export default SpecialOffersPage;
