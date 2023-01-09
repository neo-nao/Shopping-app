import { useState } from "react";
import styled from "styled-components";
import Product from "../../components/common/Product/Product";
import { flexbox } from "../../styles/extendableStyles/ExtendableStyles.styled";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import { useRef } from "react";

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
  position: relative;

  & .product-slide {
    width: 100%;
    height: 100%;
    position: absolute;

    & > * {
      height: 100%;
    }

    @media (max-width: 400px) {
      & .item-integration-container {
        align-items: flex-end;
      }

      & .price-container {
        flex-direction: column;
        align-items: flex-start;
      }
    }
  }

  & .current-slide {
    z-index: 2;

    &.slide-left {
      transition: transform 0.6s ease;
      transform: translateX(35%) scale(0.75);

      z-index: 2;
    }
    &.slide-right {
      transition: transform 0.6s ease;
      transform: translateX(-35%) scale(0.75);
      z-index: 2;
    }
  }

  & .previous-slide {
    top: 50%;
    left: -35%;
    transform: translateY(-50%) scale(0.75);

    &.slide-left {
      transition: transform 0.6s ease;
      transform: translate(35%, -50%) scale(1);
      z-index: 3;
    }
    &.slide-right {
      transition: transform 0.6s ease;
      transform: translate(50%, -50%) scale(0.75);
    }
  }

  & .next-slide {
    top: 50%;
    right: -35%;
    transform: translateY(-50%) scale(0.75);

    &.slide-left {
      transition: transform 0.6s ease;
      transform: translate(-50%, -50%) scale(0.75);
    }
    &.slide-right {
      transition: transform 0.6s ease;
      transform: translate(-35%, -50%) scale(1);
      z-index: 3;
    }
  }

  & .upcoming-slide {
    top: 50%;
    right: 0;
    z-index: 1;
    transform: translateY(-50%) scale(0.75);

    &.slide-left {
      transition: transform 0.6s ease;
      transform: translate(-35%, -50%) scale(0.75);
    }
    &.slide-right {
      transition: transform 0.6s ease;
      transform: translate(35%, -50%) scale(0.75);
    }
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

let isSliding = false;

const ProductSlider = ({ products }) => {
  const [index, setIndex] = useState(0);

  const prevSlide = useRef();
  const currentSlide = useRef();
  const nextSlide = useRef();
  const upcomingSlide = useRef();

  const sliderIndexLogic = (index) => {
    const maxIndex = products.length - 1;

    if (index < 0) return maxIndex;
    if (index > maxIndex) {
      const upcomingIndex = index - maxIndex - 1;
      return upcomingIndex;
    }

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
      case "upcoming": {
        return sliderIndexLogic(index + 2);
      }
      default:
        console.error("slide identifier is not valid!");
    }
  };

  const handleSlide = (dir) => {
    switch (dir) {
      case "left":
        if (!isSliding) {
          isSliding = true;

          prevSlide.current.classList.add("slide-left");
          currentSlide.current.classList.add("slide-left");
          nextSlide.current.classList.add("slide-left");
          upcomingSlide.current.classList.add("slide-left");

          setTimeout(() => {
            setIndex(sliderIndexLogic(index - 1));
            prevSlide.current.classList.remove("slide-left");
            currentSlide.current.classList.remove("slide-left");
            nextSlide.current.classList.remove("slide-left");
            upcomingSlide.current.classList.remove("slide-left");

            isSliding = false;
          }, 675);
        }
        break;
      case "right":
        if (!isSliding) {
          isSliding = true;

          prevSlide.current.classList.add("slide-right");
          currentSlide.current.classList.add("slide-right");
          nextSlide.current.classList.add("slide-right");
          upcomingSlide.current.classList.add("slide-right");

          setTimeout(() => {
            setIndex(sliderIndexLogic(index + 1));
            prevSlide.current.classList.remove("slide-right");
            currentSlide.current.classList.remove("slide-right");
            nextSlide.current.classList.remove("slide-right");
            upcomingSlide.current.classList.remove("slide-right");

            isSliding = false;
          }, 675);
        }
        break;
      default:
        console.error("slide direction is not valid");
    }
  };

  return (
    <SliderContainer>
      <SliderInnerContainer>
        <div className="product-slide previous-slide" ref={prevSlide}>
          <Product {...products[getSliderIndex("previous")]} />
        </div>
        <div className="product-slide current-slide" ref={currentSlide}>
          <Product {...products[getSliderIndex("current")]} />
        </div>
        <div className="product-slide next-slide" ref={nextSlide}>
          <Product {...products[getSliderIndex("next")]} />
        </div>
        <div className="product-slide upcoming-slide" ref={upcomingSlide}>
          <Product {...products[getSliderIndex("upcoming")]} />
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
