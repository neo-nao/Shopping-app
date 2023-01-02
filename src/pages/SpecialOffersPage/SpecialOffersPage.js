import ProductsPage from "../ProductsPage/ProductsPage";

const loading = false;
const error = null;
const products = [
  {
    id: 5,
    category: "walking",
    type: "oldSchool",
    shoe: "old school",
    color: ["red"],
    shoeImage: "https://s2.uupload.ir/files/sneaker-red-1_(1)_aq36.jpg",
    price: "13.49",
    priceType: "USD",
  },
  {
    id: 6,
    category: "hiking",
    type: "work boots",
    color: ["black", "white", "brown"],
    shoeImage: "https://s2.uupload.ir/files/sneaker-blackwhitebrown-1_p68h.jpg",
    price: "100",
    priceType: "USD",
  },
  {
    id: 7,
    category: "dancing",
    type: "chuck taylor",
    color: ["black", "white"],
    shoeImage: "https://s2.uupload.ir/files/sneaker-blackwhite-1_(1)_vyp.jpg",
    price: "62.19",
    priceType: "USD",
  },
];

const SpecialOffersPage = ({ filterURL: { dynamicURL, handleDynamicURL } }) => {
  return (
    <ProductsPage
      loading={loading}
      error={error}
      products={products}
      dynamicURL={dynamicURL}
      handleDynamicURL={handleDynamicURL}
    />
  );
};

export default SpecialOffersPage;
