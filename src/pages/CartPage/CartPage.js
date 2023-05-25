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
import Loading from "../../components/common/Loading/Loading";
import FullPageHeight from "../../components/common/FullPageHeight/FullPageHeight";
import { GrLogin } from "react-icons/gr";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import { BiCommentError } from "react-icons/bi";
import DotLoading from "../../components/common/DotLoading/DotLoading";
import MessageBox from "../../components/common/MessageBox/MessageBox";

const calcTotalPrice = (productDetail, ownedItems) => {
  if (productDetail.length === ownedItems.length) {
    const totalPrice = productDetail.reduce(
      (prevVal, { price, offPrice }, index) =>
        prevVal + (offPrice ? +offPrice : +price) * ownedItems[index].quantity,
      0
    );

    return totalPrice.toFixed(2);
  }
};

const CartPage = () => {
  const [userProducts, setUserProducts] = useState([]);
  const [productFetchLoading, setProductFetchLoading] = useState(false);
  const { requestStatus, user } = useSelector((state) => state.user);

  useEffect(() => {
    if (user && user.cart.items) {
      setProductFetchLoading(true);

      const reqParam = user.cart.items
        .map(({ productID }, idx) =>
          idx === 0 ? `?id=${productID}` : `&id=${productID}`
        )
        .join("");

      const getProducts = async () => {
        // setUserProducts(res);
      };

      getProducts().then(() => setProductFetchLoading(false));
    }
  }, [user && user.cart.items]);

  const renderUserItems = (completeOverview = true) => {
    const userProductElements = [];

    if (user) {
      if (user.cart.items.length > 0 && userProducts.length)
        for (let i = 0; i < user.cart.items.length; i++) {
          const { id, quantity, itemColor, productID } = user.cart.items[i];

          const product = userProducts.find((p) => p.id === productID);

          userProductElements.push(
            completeOverview ? (
              <UserProduct key={id} userItem={{ product, itemColor }} />
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

      if (error)
        return (
          <FullPageHeight>
            <MessageBox icon={<BiCommentError />} title={error} />
          </FullPageHeight>
        );

      if (userProducts.length < 1)
        return (
          <FullPageHeight centerElements>
            <MessageBox
              icon={<MdOutlineRemoveShoppingCart />}
              title="Cart is empty"
              fontSize="30px"
            />
          </FullPageHeight>
        );

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
                      {!productFetchLoading ? (
                        userProducts.length > 0 &&
                        user &&
                        !productFetchLoading && (
                          <>{calcTotalPrice(userProducts, user.cart.items)} $</>
                        )
                      ) : (
                        <DotLoading />
                      )}
                    </h3>
                  </TotalPriceDescription>
                  <Button
                    style={{
                      width: "100%",
                      height: "3rem",
                      fontSize: "17.5px",
                    }}>
                    Purchase
                  </Button>
                </div>
              </UserCheckoutSection>
            </section>
          </UserProductsContainer>
        </section>
      );
    }

    return (
      <FullPageHeight centerElements>
        <MessageBox icon={<GrLogin />} title="Please log into your account" />
      </FullPageHeight>
    );
  };

  return renderElements();
};

export default CartPage;
