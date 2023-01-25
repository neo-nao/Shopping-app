import { useState, useEffect, useRef } from "react";
import Product from "../../components/common/Product/Product";
import {
  SliderContainer,
  SliderInnerContainer,
  SlideButton,
} from "./ProductsSliderElements.styled";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import { sliderIndexLogic } from "../../utils/appUtils";

let isSliding = false;
const slideStates = [
  "previous-slide",
  "current-slide",
  "next-slide",
  "upcoming-slide",
];
let slideStateIndex = 1;

const slideStateLogicIndex = sliderIndexLogic(slideStates.length);

const ProductSlider = ({ products }) => {
  const [index, setIndex] = useState({
    currentIndex: 0,
    slideDirection: null,
  });

  const prevSlide = useRef();
  const currentSlide = useRef();
  const nextSlide = useRef();
  const upcomingSlide = useRef();

  useEffect(() => {
    return () => (slideStateIndex = 1);
  }, []);

  const itemsSliderIndexLogic = sliderIndexLogic(products.length);

  const handleSlide = (dir) => {
    if (!isSliding) {
      switch (dir) {
        case "left":
          isSliding = true;

          setIndex({
            currentIndex: itemsSliderIndexLogic(index.currentIndex - 1),
            slideDirection: "left",
          });

          prevSlide.current.classList.add("slide-left");
          currentSlide.current.classList.add("slide-left");
          nextSlide.current.classList.add("slide-left");
          upcomingSlide.current.classList.add("slide-left");

          currentSlide.current.onanimationend = () => {
            prevSlide.current.classList.replace(
              slideStates[slideStateLogicIndex(slideStateIndex - 1)],
              slideStates[slideStateLogicIndex(slideStateIndex)]
            );
            currentSlide.current.classList.replace(
              slideStates[slideStateLogicIndex(slideStateIndex)],
              slideStates[slideStateLogicIndex(slideStateIndex + 1)]
            );
            nextSlide.current.classList.replace(
              slideStates[slideStateLogicIndex(slideStateIndex + 1)],
              slideStates[slideStateLogicIndex(slideStateIndex + 2)]
            );
            upcomingSlide.current.classList.replace(
              slideStates[slideStateLogicIndex(slideStateIndex + 2)],
              slideStates[slideStateLogicIndex(slideStateIndex + 3)]
            );

            slideStateIndex = slideStateLogicIndex(slideStateIndex + 1);

            prevSlide.current.classList.remove("slide-left");
            currentSlide.current.classList.remove("slide-left");
            nextSlide.current.classList.remove("slide-left");
            upcomingSlide.current.classList.remove("slide-left");

            isSliding = false;
          };

          break;
        case "right":
          isSliding = true;

          setIndex({
            currentIndex: itemsSliderIndexLogic(index.currentIndex + 1),
            slideDirection: "right",
          });

          prevSlide.current.classList.add("slide-right");
          currentSlide.current.classList.add("slide-right");
          nextSlide.current.classList.add("slide-right");
          upcomingSlide.current.classList.add("slide-right");

          currentSlide.current.onanimationend = () => {
            prevSlide.current.classList.replace(
              slideStates[slideStateLogicIndex(slideStateIndex - 1)],
              slideStates[slideStateLogicIndex(slideStateIndex - 2)]
            );
            currentSlide.current.classList.replace(
              slideStates[slideStateLogicIndex(slideStateIndex)],
              slideStates[slideStateLogicIndex(slideStateIndex - 1)]
            );
            nextSlide.current.classList.replace(
              slideStates[slideStateLogicIndex(slideStateIndex + 1)],
              slideStates[slideStateLogicIndex(slideStateIndex)]
            );
            upcomingSlide.current.classList.replace(
              slideStates[slideStateLogicIndex(slideStateIndex + 2)],
              slideStates[slideStateLogicIndex(slideStateIndex + 1)]
            );

            slideStateIndex = slideStateLogicIndex(slideStateIndex - 1);

            prevSlide.current.classList.remove("slide-right");
            currentSlide.current.classList.remove("slide-right");
            nextSlide.current.classList.remove("slide-right");
            upcomingSlide.current.classList.remove("slide-right");

            isSliding = false;
          };

          break;
        default:
          console.error("slide direction is not valid");
      }
    }
  };

  const renderSlides = () => {
    return [prevSlide, currentSlide, nextSlide, upcomingSlide].map(
      (slideRef, idx) => {
        let propsObj = products[idx];

        if (idx === 0) propsObj = products[0];

        if (
          slideRef.current &&
          slideRef.current.classList.contains("upcoming-slide")
        ) {
          propsObj =
            products[
              itemsSliderIndexLogic(
                index.slideDirection && index.slideDirection === "right"
                  ? index.currentIndex + 2
                  : index.slideDirection === "left" && index.currentIndex
              )
            ];
        }

        return (
          <div
            key={idx}
            className={`product-slide ${slideStates[idx]}`}
            ref={slideRef}
          >
            <Product {...propsObj} />
          </div>
        );
      }
    );
  };

  return (
    <SliderContainer>
      <SliderInnerContainer>{renderSlides()}</SliderInnerContainer>
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
