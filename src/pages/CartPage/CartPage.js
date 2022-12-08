import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Button from "../../components/common/Button/Button";
import {
  UserProductsContainer,
  UserCheckoutSection,
  ItemDetails,
  TotalPriceDescription,
} from "../../styles/Elements/CartPageElements.styled";
import ShortItemDetail from "../../components/ShortItemDetail/ShortItemDetail";
import UserProduct from "./UserProduct";
import { fetchFunc } from "../../services/requestServices";
import Loading from "../../components/common/Loading/Loading";
import FullPageHeight from "../../components/common/FullPageHeight/FullPageHeight";
import { GrLogin } from "react-icons/gr";
import DotLoading from "../../components/common/DotLoading/DotLoading";

const calcTotalPrice = (productDetail, ownedItems) => {
  if (productDetail.length === ownedItems.length) {
    const totalPrice = productDetail.reduce(
      (prevVal, currVal, index) =>
        prevVal + +currVal.price * ownedItems[index].quantity,
      0
    );

    return totalPrice.toFixed(2);
  }
};

let productFetchLoading = false;

const CartPage = () => {
  const [userProducts, setUserProducts] = useState([]);
  const { requestStatus, user } = useSelector((state) => state.user);

  useEffect(() => {
    if (user && user.cart.items && user.cart.items.length) {
      productFetchLoading = true;

      const reqParam = user.cart.items
        .map(({ productID }, idx) =>
          idx === 0 ? `?id=${productID}` : `&id=${productID}`
        )
        .join("");

      const getProducts = async () => {
        const res = await fetchFunc("/products" + reqParam);

        setUserProducts(res);
      };

      getProducts().then(() => (productFetchLoading = false));
    }
  }, [user && user.cart.items]);

  const renderUserItems = (completeOverview = true) => {
    const userProductElements = [];

    if (user) {
      if (user.cart.items.length > 0 && userProducts.length)
        for (let i = 0; i < user.cart.items.length; i++) {
          const { id, quantity, productID } = user.cart.items[i];

          const product = userProducts.find((p) => p.id === productID);

          userProductElements.push(
            completeOverview ? (
              <UserProduct key={id} product={product} quantity={quantity} />
            ) : (
              <ShortItemDetail key={id} product={product} quantity={quantity} />
            )
          );
        }
    }

    return userProductElements;
  };

  const renderElements = () => {
    if (user) {
      const { loading, error } = requestStatus;

      if (loading)
        return (
          <FullPageHeight centerElements>
            <Loading />
          </FullPageHeight>
        );
      if (error) return <>{error}</>;

      return (
        <section>
          <UserProductsContainer>
            <section>{renderUserItems()}</section>
            <section>
              <UserCheckoutSection>
                <ItemDetails>
                  <ul>{renderUserItems(false)}</ul>
                </ItemDetails>
                <div style={{ padding: "0 7.5px" }}>
                  <TotalPriceDescription>
                    <h3>Total Price : </h3>
                    <h3>
                      {userProducts.length > 0 &&
                        user &&
                        !productFetchLoading &&
                        calcTotalPrice(userProducts, user.cart.items)}{" "}
                      ${/* <DotLoading /> */}
                    </h3>
                  </TotalPriceDescription>
                  <Button
                    style={{
                      width: "100%",
                      height: "3rem",
                      fontSize: "17.5px",
                    }}
                  >
                    Purchase
                  </Button>
                </div>
              </UserCheckoutSection>
            </section>
          </UserProductsContainer>
        </section>
      );
    } else
      return (
        <FullPageHeight centerElements>
          <div
            style={{
              width: "90%",
              height: "200px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <GrLogin style={{ fontSize: "60px" }} />
            <h1 style={{ textAlign: "center" }}>
              Please log into your account first
            </h1>
          </div>
        </FullPageHeight>
      );
  };

  return renderElements();
};

export default CartPage;
