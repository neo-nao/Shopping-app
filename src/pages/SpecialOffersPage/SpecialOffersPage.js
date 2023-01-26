import { useSelector } from "react-redux";
import ProductsContainer from "../../container/ProductsContainer/ProductsContainer";
import { getAsyncSpecialOffers } from "../../redux/specialOffers/specialOffersSlice";
import {
  filterProducts,
  clearFilter,
  resetFilter,
} from "../../redux/specialOffers/specialOffersSlice";

const SpecialOffersPage = () => {
  const { loading, error, products, filteredOptions } = useSelector(
    (state) => state.specialOffers
  );

  return (
    <ProductsContainer
      productsFetchState={{ loading, error, products }}
      getAsyncProducts={getAsyncSpecialOffers}
      filter={{
        filteredProducts: filteredOptions,
        actions: { filterProducts, clearFilter, resetFilter },
      }}
    />
  );
};

export default SpecialOffersPage;
