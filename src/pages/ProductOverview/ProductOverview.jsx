import { useState, useEffect, useLayoutEffect } from "react";
import { useRouter } from "wouter";
import styled from "styled-components";
import FullPageHeight from "../../components/common/FullPageHeight/FullPageHeight";
import { fetchFunc } from "../../services/requestServices";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import Slider from "../../container/Slider/Slider";
import { firstLetterUpperCase } from "../../utils/appUtils";
import Stars from "../../components/common/Product/Stars";
import Price from "../../components/Price/Price";
import { flexbox } from "../../styles/extendableStyles/ExtendableStyles.styled";
import ItemColors from "../../components/ItemColors/ItemColors";

const Container = styled.div`
  width: 92.5%;
  height: fit-content;
  margin: auto;

  & .item-title {
    font-size: 35px;
    padding: 1rem 0;
  }

  & .item-rates {
    ${flexbox({ justify: "space-between" })}
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 300px;
  user-select: none;

  .item-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ProductOverview = ({ params }) => {
  const [product, setProduct] = useState(null);
  const [colorsState, setColorsState] = useState(null);
  const router = useRouter();

  const itemId = Number(params.id);
  const isIdInt = Number.isInteger(itemId);

  useLayoutEffect(() => {
    if (isIdInt) {
      if (!router.itemState) {
        const fetchProduct = async (id) => {
          const response = await fetchFunc("/products/" + id);

          setProduct(response);
        };
        fetchProduct(itemId);
      } else setProduct(router.itemState);
    }
  }, []);

  const createColors = (colors) => {
    const colorsObj = colors.map((color, idx) => ({
      id: idx,
      color,
      active: false,
    }));

    setColorsState(colorsObj);
  };

  useEffect(() => {
    product && createColors(product.colors);
  }, [product]);

  const handleColorClick = (id) => {
    const colorsCopy = colorsState.map((color) => {
      return { ...color, active: false };
    });

    const clickedColor = colorsCopy.find((color) => color.id === id);
    clickedColor.active = true;

    setColorsState(colorsCopy);
  };

  const renderElements = () => {
    if (product) {
      const { type, shoe, price, priceType, shoeImages, itemStars } = product;

      return isIdInt ? (
        <Container>
          <Slider
            items={shoeImages.map((shoeImage, idx) => ({
              id: "slide-" + idx,
              innerElement: (
                <ImageContainer>
                  <img
                    src={shoeImage}
                    alt="shoe"
                    className="item-img"
                    draggable="false"
                  />
                </ImageContainer>
              ),
            }))}
          />
          <h1 className="item-title">{firstLetterUpperCase(shoe ?? type)}</h1>
          <div className="item-rates">
            <Price price={price} priceType={priceType} />
            <Stars filledStars={itemStars} />
          </div>
          {colorsState && (
            <ItemColors
              colors={colorsState}
              handleColorClick={handleColorClick}
            />
          )}
        </Container>
      ) : (
        <NotFoundPage />
      );
    }
  };

  return <FullPageHeight>{renderElements()}</FullPageHeight>;
};

export default ProductOverview;
