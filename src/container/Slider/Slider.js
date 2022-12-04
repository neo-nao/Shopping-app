import { useRef, useEffect, useReducer } from "react";
import {
  SliderContainer,
  CarouselSlider,
  SliderItem,
  SlideChangeButton,
} from "./SliderStyled";

const sliderInitialState = {
  index: 0,
  isSliding: false,
};

const indexReducer = (state, action) => {
  const { index } = state;
  const items = 3;
  switch (action.type) {
    case "slide-left": {
      const updatedIndex = index - 1 < 0 ? items - 1 : index - 1;

      return { ...state, index: updatedIndex };
    }
    case "slide-right": {
      const updatedIndex = index + 1 > items - 1 ? 0 : index + 1;

      return { ...state, index: updatedIndex };
    }
    case "sliderStatus": {
      return { ...state, isSliding: action.payload };
    }
    default:
      return state;
  }
};

let slideCountTime = 0;

const Slider = ({ items }) => {
  const [sliderState, dispatch] = useReducer(indexReducer, sliderInitialState);

  const sliderRef = useRef();

  const slide = (direction) => {
    slideCountTime = 0;
    !sliderState.isSliding && dispatch({ type: `slide-${direction}` });
    dispatch({ type: "sliderStatus", payload: true });
  };

  useEffect(() => {
    sliderState.isSliding &&
      setTimeout(() => {
        dispatch({ type: "sliderStatus", payload: false });
      }, 600);

    if (sliderRef.current)
      sliderRef.current.style.transform =
        "translateX(calc(-100% * " + sliderState.index + "))";
  }, [sliderState.index]);

  useEffect(() => {
    const autoSLideCountTime = setInterval(() => {
      slideCountTime++;

      slideCountTime >= 25 && slide("right");
    }, 200);

    return () => {
      clearInterval(autoSLideCountTime);
      slideCountTime = 0;
    };
  }, []);

  return (
    <SliderContainer>
      <CarouselSlider ref={sliderRef}>
        {items.map(({ id, color }) => (
          <SliderItem key={id} backgroundColor={color}></SliderItem>
        ))}
      </CarouselSlider>

      {["left", "right"].map((val, index) => (
        <SlideChangeButton
          key={index}
          direction={val}
          onClick={() => slide(val)}
        >
          {val}
        </SlideChangeButton>
      ))}
    </SliderContainer>
  );
};

export default Slider;
