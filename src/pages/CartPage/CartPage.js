import { useSelector, useDispatch } from "react-redux";
import Button from "../../components/common/Button/Button";
import {
  UserProductsContainer,
  UserCheckoutSection,
  ItemDetails,
  TotalPriceDescription,
} from "../../styles/Elements/CartPageElements.styled";
import ShortItemDetail from "../../components/ShortItemDetail/ShortItemDetail";
import UserProduct from "./UserProduct";
import FullPageHeight from "../../components/common/FullPageHeight/FullPageHeight";
import { GrLogin } from "react-icons/gr";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import MessageBox from "../../components/common/MessageBox/MessageBox";
import { showAlert } from "../../redux/alert/alertSlice";
import { useCallback } from "react";

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
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handlePurchase = useCallback(
    () =>
      dispatch(
        showAlert({
          title: "Purchase succeed",
          paragraph:
            "your successfully purchased the items thank you for your shopping\n\n- Next shoes",
        })
      ),
    []
  );

  if (!user)
    return (
      <FullPageHeight centerElements>
        <MessageBox icon={<GrLogin />} title="Please log into your account" />
      </FullPageHeight>
    );

  const userItems = user.cart.items;

  const renderUserItems = (completeOverview = true) => {
    const userProductElements = [];

    if (userItems.length)
      for (const item of userItems) {
        const { id, quantity, color } = item;

        const product = userItems.find((p) => p.id === id);

        userProductElements.push(
          completeOverview ? (
            <UserProduct key={id} userItem={{ product, color }} />
          ) : (
            <ShortItemDetail key={id} product={product} quantity={quantity} />
          )
        );
      }

    return userProductElements;
  };

  const renderElements = () => {
    if (userItems.length < 1)
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
                    {userItems.length && user && (
                      <>{calcTotalPrice(userItems, user.cart.items)} $</>
                    )}
                  </h3>
                </TotalPriceDescription>
                <Button
                  style={{
                    width: "100%",
                    height: "3rem",
                    fontSize: "17.5px",
                  }}
                  onClick={handlePurchase}>
                  Purchase
                </Button>
              </div>
            </UserCheckoutSection>
          </section>
        </UserProductsContainer>
      </section>
    );
  };

  return renderElements();
};

export default CartPage;
