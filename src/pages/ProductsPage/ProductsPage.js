import { useSelector } from "react-redux";
import ProductsContainer from "../../container/ProductsContainer/ProductsContainer";
import { getAsyncProducts } from "../../redux/prodcuts/productsSlice";
import {
  filterProducts,
  clearFilter,
  resetFilter,
} from "../../redux/prodcuts/productsSlice";

const ProductsPage = () => {
  const { loading, error, products, filteredOptions } = useSelector(
    (state) => state.products
  );

  return (
    <ProductsContainer
      productsFetchState={{ loading, error, products }}
      getAsyncProducts={getAsyncProducts}
      filter={{
        filteredProducts: filteredOptions,
        actions: { filterProducts, clearFilter, resetFilter },
      }}
    />
  );
};

export default ProductsPage;
