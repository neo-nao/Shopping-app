import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "wouter";
import { addItem, removeItem } from "../redux/user/userSlice";

const useAddItem = (itemId, itemColor) => {
  const userAccount = useSelector((state) => state.user.user);

  const dispatch = useDispatch();

  const [, navigate] = useLocation();

  const checkIsItemAdded = () =>
    userAccount.cart.items.some((item) => item.id === itemId) ?? null;

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (userAccount) {
      dispatch(
        checkIsItemAdded() ? removeItem(itemId) : addItem({ itemId, itemColor })
      );
    } else {
      navigate("/auth/login");
    }
  };

  return [userAccount ? checkIsItemAdded() : false, handleAddToCart];
};

export default useAddItem;
