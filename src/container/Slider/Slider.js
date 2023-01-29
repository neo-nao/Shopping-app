import { useRef, useEffect, useReducer } from "react";
import {
  SliderContainer,
  CarouselSlider,
  SliderItem,
  SlideChangeButton,
} from "./SliderStyled";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";

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
let firstXPos = null;

const Slider = ({ items, controlButtons, touchable }) => {
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

  const handleDrag = (event, mouseEvent) => {
    const xPos = event.pageX;
    let touchXPos = event.changedTouches && event.changedTouches[0].pageX;

    switch (mouseEvent) {
      case "mousedown": {
        firstXPos = xPos;
        break;
      }
      case "mouseup": {
        const isLeftOrRight =
          xPos < firstXPos ? "left" : xPos > firstXPos && "right";

        isLeftOrRight === "left"
          ? slide("right")
          : isLeftOrRight === "right" && slide("left");
        break;
      }
      case "touchstart": {
        firstXPos = touchXPos;
        break;
      }
      case "touchend": {
        const isLeftOrRight =
          touchXPos < firstXPos ? "left" : touchXPos > firstXPos && "right";

        isLeftOrRight === "left"
          ? slide("right")
          : isLeftOrRight === "right" && slide("left");
        break;
      }
      default:
        console.error("mouse event is invalid");
    }
  };

  const touchableEvents = touchable
    ? {
        onMouseDown: (e) => handleDrag(e, "mousedown"),
        onMouseUp: (e) => handleDrag(e, "mouseup"),
        onTouchStart: (e) => handleDrag(e, "touchstart"),
        onTouchEnd: (e) => handleDrag(e, "touchend"),
      }
    : {};

  return (
    <SliderContainer {...touchableEvents}>
      <CarouselSlider ref={sliderRef}>
        {items.map(({ id, innerElement }) => (
          <SliderItem key={id}>{innerElement}</SliderItem>
        ))}
      </CarouselSlider>
      {controlButtons &&
        [
          { dir: "left", el: <BiLeftArrow /> },
          { dir: "right", el: <BiRightArrow /> },
        ].map((val, index) => (
          <SlideChangeButton
            key={index}
            direction={val.dir}
            onClick={() => slide(val.dir)}
          >
            {val.el}
          </SlideChangeButton>
        ))}
    </SliderContainer>
  );
};

export default Slider;
