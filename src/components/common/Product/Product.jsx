import { memo } from "react";
import { Link, useRouter } from "wouter";
import styled from "styled-components";
import { flexbox } from "../../../styles/extendableStyles/ExtendableStyles.styled";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Price from "../../Price/Price";
import ProductTitle from "../../ProductTitle/ProductTitle";
import AddItemButton from "../../AddItemButton/AddItemButton";

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
  colors,
  priceType,
  shoeImages,
  itemStars = 0,
}) => {
  const router = useRouter();

  return (
    <Item>
      <Link
        href={`/products/${id}`}
        onClick={() =>
          (router.itemState = {
            id,
            type,
            shoe,
            colors,
            price,
            isDiscount,
            offPrice,
            priceType,
            shoeImages,
            itemStars,
          })
        }
        className="item-link"
      >
        <ImageSection className="image-section">
          <LazyLoadImage
            src={shoeImages && shoeImages[0]}
            alt="ITEM"
            draggable="false"
          />
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
            <AddItemButton itemId={id} itemColor={colors && colors[0]} />
          </div>
        </DescriptionSection>
      </Link>
    </Item>
  );
};

export default memo(Product);
