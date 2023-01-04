import { useSelector } from "react-redux";
import ProductsContainer from "../../container/ProductsContainer/ProductsContainer";
import { getAsyncProducts } from "../../redux/prodcuts/productsSlice";

const ProductsPage = () => {
  const { loading, error, products } = useSelector((state) => state.products);

  return (
    <ProductsContainer
      productsFetchState={{ loading, error, products }}
      getAsyncProducts={getAsyncProducts}
    />
  );
};

export default ProductsPage;
