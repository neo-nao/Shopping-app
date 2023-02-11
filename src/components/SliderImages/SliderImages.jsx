import styled from "styled-components";
import {
  sliderStateAction,
  slideToIndexAction,
  updateSlideCountTime,
} from "../../hooks/useSlider";

const SliderImagesContainer = styled.div`
  margin-top: 15px;
  border-top: 2px solid var(--black);
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding-top: 15px;
  gap: 10px;

  & img {
    width: 100%;
    height: 45px;
    object-fit: cover;
    filter: opacity(0.4);
    cursor: pointer;

    &.active {
      filter: opacity(1) saturate(200%);
    }
  }
`;

const SliderImages = ({ images, slider }) => {
  if (!slider) return;

  const [sliderState, dispatcher] = slider;

  const handleImageClick = (imageIndex) => {
    dispatcher(sliderStateAction(true));
    updateSlideCountTime(0);
    dispatcher(slideToIndexAction(imageIndex));
  };

  return (
    <SliderImagesContainer>
      {images.map((img, index) => {
        return (
          <img
            src={img}
            alt="shoe"
            className={`shoe-img-${index + 1}${
              sliderState.index === index ? " active" : ""
            }`}
            onClick={() => handleImageClick(index)}
            key={index}
            draggable={false}
          />
        );
      })}
    </SliderImagesContainer>
  );
};

export default SliderImages;
