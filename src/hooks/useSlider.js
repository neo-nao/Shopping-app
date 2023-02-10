import { useReducer } from "react";

const sliderInitialState = {
  index: 0,
  isSliding: false,
};

const indexReducer = (state, action) => {
  const { index } = state;
  const items = state.items;
  switch (action.type) {
    case "slide-left": {
      const updatedIndex = index - 1 < 0 ? items - 1 : index - 1;

      return { ...state, index: updatedIndex };
    }
    case "slide-right": {
      const updatedIndex = index + 1 > items - 1 ? 0 : index + 1;

      return { ...state, index: updatedIndex };
    }
    case "slide-to-index": {
      const passedIndex = action.payload;

      return { ...state, index: passedIndex };
    }
    case "sliderStatus": {
      return { ...state, isSliding: action.payload };
    }
    default:
      return state;
  }
};

const slideLeftAction = () => ({ type: "slide-left" });
const slideRightAction = () => ({ type: "slide-right" });
const slideToIndexAction = (index) => ({
  type: "slide-to-index",
  payload: index,
});
const sliderStateAction = (sliderStateValue) => ({
  type: "sliderStatus",
  payload: sliderStateValue,
});

let slideCountTime = 0;

const updateSlideCountTime = (value) => {
  slideCountTime = value;
  return slideCountTime;
};

const useSlider = (items) => {
  const [sliderState, dispatch] = useReducer(indexReducer, {
    ...sliderInitialState,
    items,
  });

  const slide = (direction) => {
    if (items <= 1) return;

    updateSlideCountTime(0);
    !sliderState.isSliding && dispatch({ type: `slide-${direction}` });
    dispatch(sliderStateAction(true));
  };

  return [sliderState, dispatch, slide];
};

export {
  slideLeftAction,
  slideRightAction,
  slideToIndexAction,
  sliderStateAction,
};
export { slideCountTime, updateSlideCountTime };
export default useSlider;
