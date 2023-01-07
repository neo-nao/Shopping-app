import { useState } from "react";
import styled from "styled-components";
import Product from "../../components/common/Product/Product";
import { flexbox } from "../../styles/extendableStyles/ExtendableStyles.styled";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";

const SliderContainer = styled.div`
  width: clamp(250px, 100%, 500px);
  height: 500px;
  ${flexbox({ dir: "column" })}

  & .handle-slide-btns-container {
    margin-top: 30px;
    width: 100%;
    ${flexbox({ justify: "space-around" })}
  }
`;

const SliderInnerContainer = styled.div`
  width: clamp(175px, 65%, 350px);
  height: 400px;
  background: red;
  position: relative;

  & .product-slide {
    width: 100%;
    height: 100%;
    position: absolute;

    & > * {
      height: 100%;
    }
  }

  & .current-slide {
    z-index: 1;
  }

  & .previous-slide {
    top: 50%;
    left: -35%;
    transform: translateY(-50%) scale(0.75);
  }

  & .next-slide {
    top: 50%;
    right: -35%;
    transform: translateY(-50%) scale(0.75);
  }
`;

const SlideButton = styled.button`
  width: 50px;
  height: 50px;
  z-index: 1;
  font-size: 45px;
  color: #313131;
  cursor: pointer;
  background: none;
  ${flexbox()}

  svg {
    transition: transform 0.1s ease;
  }

  &:active svg {
    transform: scale(0.9);
  }
`;

const ProductSlider = ({ products }) => {
  const [index, setIndex] = useState(0);

  const sliderIndexLogic = (index) => {
    const maxIndex = products.length - 1;

    if (index < 0) return maxIndex;
    if (index > maxIndex) return 0;

    return index;
  };

  const getSliderIndex = (identifier) => {
    switch (identifier) {
      case "previous": {
        return sliderIndexLogic(index - 1);
      }
      case "current": {
        return sliderIndexLogic(index);
      }
      case "next": {
        return sliderIndexLogic(index + 1);
      }
      default:
        console.error("slide identifier is not valid!");
    }
  };

  const handleSlide = (dir) => {
    switch (dir) {
      case "left":
        setIndex(sliderIndexLogic(index - 1));
        break;
      case "right":
        setIndex(sliderIndexLogic(index + 1));
        break;
      default:
        console.error("slide direction is not valid");
    }
  };

  return (
    <SliderContainer>
      <SliderInnerContainer>
        <div className="product-slide previous-slide">
          <Product {...products[getSliderIndex("previous")]} />
        </div>
        <div className="product-slide current-slide">
          <Product {...products[getSliderIndex("current")]} />
        </div>
        <div className="product-slide next-slide">
          <Product {...products[getSliderIndex("next")]} />
        </div>
      </SliderInnerContainer>
      <div className="handle-slide-btns-container">
        <SlideButton onClick={() => handleSlide("left")}>
          <BiLeftArrow />
        </SlideButton>
        <SlideButton onClick={() => handleSlide("right")}>
          <BiRightArrow />
        </SlideButton>
      </div>
    </SliderContainer>
  );
};

export default ProductSlider;
