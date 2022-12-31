import styled from "styled-components";
import { SlideContainerStyle } from "../../styles/Elements/SliderElements";
import shoeImage from "../../assets/SlideImages/slide-shoe-img-3.png";
import { LazyLoadImage } from "react-lazy-load-image-component";

const SlideContainer = styled(SlideContainerStyle)`
  --main-pink: #f46696;
  --secondary-pink: #f500f5;
  background: var(--white);
  position: relative;

  & .shoe-image {
    width: clamp(275px, 85%, 450px);
    position: absolute;
    right: 50%;
    top: 50%;
    transform: translate(50%, -50%);
    z-index: 1;
  }

  @media (min-width: 900px) {
    & .shoe-image {
      right: 40%;
    }
  }
`;

const TitleContainer = styled.div`
  position: absolute;
  left: 125px;
  z-index: 1;

  & > h1 {
    text-transform: uppercase;
    font-weight: 900;
    font-size: 85px;
    text-shadow: -2px 0 aqua, 2px 0 var(--main-pink);
  }
`;

const StandRect = styled.div`
  width: 75%;
  height: 175px;
  background: var(--main-pink);
  position: absolute;
  bottom: 0;
  right: 0;

  @media (max-width: 900px) {
    height: 200px;
    width: 90%;
  }
`;

const ThirdSlideElements = () => {
  return (
    <SlideContainer>
      <TitleContainer>
        <h1>
          better
          <br /> shoes for
          <br /> everyone
        </h1>
      </TitleContainer>
      <LazyLoadImage src={shoeImage} alt="Shoe" className="shoe-image" />
      <StandRect></StandRect>
    </SlideContainer>
  );
};

export default ThirdSlideElements;
