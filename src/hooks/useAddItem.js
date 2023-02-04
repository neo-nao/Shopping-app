import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "wouter";
import {
  asyncPostUserItem,
  removeUserItemPending,
} from "../redux/user/userSlice";

const useAddItem = (itemId, itemColor) => {
  const userAccount = useSelector((state) => state.user.user);

  const dispatch = useDispatch();

  const [, navigate] = useLocation();

  const checkIsItemAdded = () =>
    userAccount.cart.items.find((item) => item.productID === itemId) ?? null;

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (userAccount) {
      const userToken = userAccount.userToken;
      const addedItem = checkIsItemAdded();
      !addedItem
        ? dispatch(
            asyncPostUserItem({
              productID: itemId,
              itemColor,
              userToken: userToken,
            })
          )
        : dispatch(
            removeUserItemPending({ userToken, productID: addedItem.productID })
          );
    } else {
      navigate("/auth/login");
    }
  };

  const isItemAdded =
    userAccount &&
    userAccount.cart.items.map((item) => item.productID).indexOf(itemId) > -1;

  return [isItemAdded, handleAddToCart];
};

export default useAddItem;
