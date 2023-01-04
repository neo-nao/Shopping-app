import { useSelector } from "react-redux";
import ProductsContainer from "../../container/ProductsContainer/ProductsContainer";
import { getAsyncSpecialOffers } from "../../redux/specialOffers/specialOffersSlice";

const SpecialOffersPage = () => {
  const { loading, error, products } = useSelector(
    (state) => state.specialOffers
  );

  return (
    <ProductsContainer
      productsFetchState={{ loading, error, products }}
      getAsyncProducts={getAsyncSpecialOffers}
    />
  );
};

export default SpecialOffersPage;
