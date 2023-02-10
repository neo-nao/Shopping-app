import { useRef, useEffect } from "react";
import {
  SliderContainer,
  CarouselSlider,
  SliderItem,
  SlideChangeButton,
} from "./SliderStyled";
import useSlider, {
  sliderStateAction,
  slideCountTime,
  updateSlideCountTime,
} from "../../hooks/useSlider";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";

let firstXPos = null;

const Slider = ({ items, controlButtons, touchable, setSlider, ...rest }) => {
  const [sliderState, dispatch, slide] = useSlider(items.length);
  const sliderRef = useRef();

  useEffect(() => {
    if (setSlider) setSlider([sliderState, dispatch]);

    sliderState.isSliding &&
      setTimeout(() => {
        dispatch(sliderStateAction(false));
      }, 600);

    if (sliderRef.current)
      sliderRef.current.style.transform =
        "translateX(calc(-100% * " + sliderState.index + "))";
  }, [sliderState.index]);

  useEffect(() => {
    const autoSLideCountTime = setInterval(() => {
      const newVal = updateSlideCountTime(slideCountTime + 1);

      newVal >= 25 && slide("right");
    }, 200);

    return () => {
      clearInterval(autoSLideCountTime);
      updateSlideCountTime(0);
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
    <SliderContainer {...touchableEvents} {...rest}>
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
