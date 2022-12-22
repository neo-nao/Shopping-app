import styled from "styled-components";
import { SlideContainer } from "../../styles/Elements/SliderElements";
import bgImage from "../../assets/images/fluid-gradient-2.jpg";
import { LazyLoadImage } from "react-lazy-load-image-component";
import shoeImage from "./oldSchool-colorful (1).png";
import { placeCenter } from "../../styles/extendableStyles/ExtendableStyles.styled";

const SecondSlideContainer = styled(SlideContainer)`
  background-image: url(${bgImage});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;

  & img {
    width: clamp(300px, 80%, 400px);
    position: absolute;
    ${placeCenter()}
    animation: float 3s ease-in-out infinite alternate;
  }

  @keyframes float {
    from {
      transform: translate(-50%, -50%);
    }
    to {
      transform: translate(-50%, calc(-50% - 20px)) rotate(2deg);
    }
  }
`;

const SecondSlideElements = () => {
  return (
    <SecondSlideContainer>
      <LazyLoadImage
        src={shoeImage}
        alt="shoe"
        className="shoe-image"
        draggable="false"
      />
    </SecondSlideContainer>
  );
};

export default SecondSlideElements;
