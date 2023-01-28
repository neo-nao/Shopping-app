import { useState, useLayoutEffect } from "react";
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

  .item-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

let testColors = [
  { id: 1, color: "dodgerblue", active: true },
  { id: 2, color: "violet", active: false },
  { id: 3, color: "blueviolet", active: false },
];

const ProductOverview = ({ params }) => {
  const [product, setProduct] = useState(null);
  const router = useRouter();

  const itemId = Number(params.id);
  const isIdInt = Number.isInteger(itemId);

  useLayoutEffect(() => {
    const fetchProduct = async (id) => {
      const response = await fetchFunc("/products/" + id);

      setProduct(response);
    };
    if (isIdInt) {
      fetchProduct(itemId);
    }
  }, []);

  const handleColorClick = (id) => {
    const colorsCopy = [...testColors];
    const clickedColor = colorsCopy.find((color) => color.id === id);
    colorsCopy.forEach((color) => (color.active = false));
    clickedColor.active = true;
    testColors = colorsCopy;
    console.log(testColors);
  };

  const renderElements = () => {
    if (router.itemState || product) {
      const {
        type,
        shoe,
        price,
        isDiscount,
        offPrice,
        priceType,
        shoeImages,
        itemStars,
      } = router.itemState ?? product;

      return isIdInt ? (
        <Container>
          <Slider
            items={shoeImages.map((shoeImage, idx) => ({
              id: "slide-" + idx,
              innerElement: (
                <ImageContainer>
                  <img src={shoeImage} alt="shoe" className="item-img" />
                </ImageContainer>
              ),
            }))}
          />
          <h1 className="item-title">{firstLetterUpperCase(shoe ?? type)}</h1>
          <div className="item-rates">
            <Price price={price} priceType={priceType} />
            <Stars filledStars={itemStars} />
          </div>
          <ItemColors colors={testColors} handleColorClick={handleColorClick} />
        </Container>
      ) : (
        <NotFoundPage />
      );
    }
  };

  return <FullPageHeight>{renderElements()}</FullPageHeight>;
};

export default ProductOverview;
