import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  asyncPostUserItem,
  removeUserItemPending,
} from "../../../redux/user/userSlice";
import styled from "styled-components";
import { flexbox } from "../../../styles/extendableStyles/ExtendableStyles.styled";
import Button from "../Button/Button";
import { IoAddSharp } from "react-icons/io5";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Item = styled.div`
  height: 22rem;
  background-color: var(--white);
  border: 2px solid var(--black);
  position: relative;
  padding: 7.5px;
  ${flexbox({ dir: "column", justify: "space-between" })}

  & > section {
    width: 100%;
  }
`;

const ImageSection = styled.section`
  height: 70%;
  overflow: hidden;
  cursor: pointer;
  & > img {
    transition: transform 0.3s ease;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &:hover {
    & > img {
      transform: scale(1.1);
    }
  }
`;

const DescriptionSection = styled.section`
  height: calc(100% - 70%);
  padding: 2.5px;
  width: 100%;
  ${flexbox({ dir: "column", justify: "space-between" })}

  & > h1 {
    font-family: var(--primary-font);
    margin-top: 12.5px;
    font-size: 18.5px;
    text-transform: capitalize;
  }

  & > .item-integration-container {
    & > h1 {
      margin-left: 5px;
    }

    width: 100%;
    ${flexbox({ justify: "space-between" })};
  }
`;

const Product = ({ id, type, price, priceType, shoeImage }) => {
  const userAccount = useSelector((state) => state.user.user);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const checkIsItemAdded = () => {
    return userAccount.cart.items.find((item) => item.productID === id) ?? null;
  };

  const handleAddToCart = () => {
    if (userAccount) {
      const userToken = userAccount.userToken;
      const addedItem = checkIsItemAdded();
      !addedItem
        ? dispatch(asyncPostUserItem({ productID: id, userToken: userToken }))
        : dispatch(
            removeUserItemPending({ userToken, productID: addedItem.productID })
          );
    } else {
      navigate("/auth/login");
    }
  };

  const isItemAdded =
    userAccount &&
    userAccount.cart.items.map((item) => item.productID).indexOf(id) > -1;

  return (
    <Item>
      <ImageSection className="image-section">
        <LazyLoadImage src={shoeImage} alt="ITEM" draggable="false" />
      </ImageSection>
      <DescriptionSection className="description-section">
        <h1>{type}</h1>
        <div className="item-integration-container">
          <h1>
            <span style={{ marginRight: "2.5px" }}>{price}</span>
            {priceType === "USD" && "$"}
          </h1>
          <Button onClick={handleAddToCart} active={isItemAdded}>
            <span style={{ padding: "0 5px" }}>
              {isItemAdded ? "Remove" : "Add"}
            </span>
            <IoAddSharp
              style={{
                transition: "transform .2s ease",
                fontSize: "22.5px",
                transform: isItemAdded ? "rotate(45deg)" : "",
              }}
            />
          </Button>
        </div>
      </DescriptionSection>
    </Item>
  );
};

export default Product;
