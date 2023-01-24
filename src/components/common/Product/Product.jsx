import { memo } from "react";
import { Link, useLocation, useRouter } from "wouter";
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
import Price from "../../Price/Price";
import ProductTitle from "../../ProductTitle/ProductTitle";

const Item = styled.div`
  transition: border 0.2s linear;
  height: 22rem;
  background-color: var(--white);
  border: 2px solid var(--light-gray);
  position: relative;
  ${flexbox({ dir: "column", justify: "space-between" })}

  & > section {
    width: 100%;
  }

  &:hover {
    border-color: var(--black);
  }

  .item-link {
    display: block;
    width: 100%;
    height: 100%;
    color: unset;
    padding: 7.5px;
  }
`;

const ImageSection = styled.section`
  height: 70%;
  overflow: hidden;
  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
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

const Product = ({
  id,
  type,
  shoe,
  price,
  isDiscount,
  offPrice,
  priceType,
  shoeImage,
  itemStars = 0,
}) => {
  const userAccount = useSelector((state) => state.user.user);

  const dispatch = useDispatch();

  const [, navigate] = useLocation();
  const router = useRouter();

  const checkIsItemAdded = () => {
    return userAccount.cart.items.find((item) => item.productID === id) ?? null;
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
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
      <Link
        href={`/products/${id}`}
        onClick={() =>
          (router.itemState = {
            id,
            type,
            shoe,
            price,
            isDiscount,
            offPrice,
            priceType,
            shoeImage,
            itemStars,
          })
        }
        className="item-link"
      >
        <ImageSection className="image-section">
          <LazyLoadImage src={shoeImage} alt="ITEM" draggable="false" />
        </ImageSection>
        <DescriptionSection>
          <ProductTitle shoe={shoe} type={type} itemStars={itemStars} />
          <div className="item-integration-container">
            <Price
              isDiscount={isDiscount}
              offPrice={offPrice}
              price={price}
              priceType={priceType}
            />
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
      </Link>
    </Item>
  );
};

export default memo(Product);
