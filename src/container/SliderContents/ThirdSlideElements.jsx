import styled from "styled-components";
import { SlideContainerStyle } from "../../styles/Elements/SliderElements";
import shoeImage from "../../assets/SlideImages/slide-shoe-img-3.png";
import { LazyLoadImage } from "react-lazy-load-image-component";

const SlideContainer = styled(SlideContainerStyle)`
  --main-pink: #f46696;
  --secondary-pink: #f500f5;
  background: var(--white);
  position: relative;
  user-select: none;

  & .shoe-image {
    width: clamp(275px, 80%, 550px);
    position: absolute;
    right: 50%;
    top: 50%;
    transform: translate(50%, -50%);
    z-index: 1;
  }

  @media (min-width: 900px) {
    & .shoe-image {
      right: 35%;
    }
  }

  @media (max-width: 1300px) {
    & .shoe-image {
      width: clamp(275px, 60vw, 600px);
      position: absolute;
      right: 30%;
    }
  }
  @media (max-width: 1090px) {
    & .title-container {
      & > h1 {
        font-size: 75px;
      }
    }
  }
  @media (max-width: 885px) {
    & .shoe-image {
      right: 50%;
    }

    & .title-container {
      top: 50px;
      left: 50%;
      transform: translateX(-50%);

      & > h1 {
        font-size: clamp(40px, 7vw, 80px);
        text-align: center;

        & br {
          display: none;
        }
      }
    }
  }

  @media (max-width: 700px) {
    & .shoe-image {
      top: 60%;
    }

    & .rect {
      width: 200px;
      height: 200px;
      right: 0;
    }

    & .rect-1 {
      left: 5%;
    }
  }

  @media (max-width: 500px) {
    & .rect-1 {
      top: 200px;
    }
    & .rect-2 {
      top: 10px;
    }
  }
`;

const Rect = styled.div`
  width: 250px;
  height: 250px;
  background-color: ${(props) => props.color || "var(--white)"};
  position: absolute;
  transform: rotate(${(props) => props.rotate || "0deg"});

  ${(props) => props.position}
`;

const SlideInnerContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(45px);
`;

const TitleContainer = styled.div`
  position: absolute;
  top: 75px;
  left: 125px;
  z-index: 2;

  & > h1 {
    text-transform: uppercase;
    font-weight: 900;
    font-size: 85px;
    text-shadow: -3px 0 aqua, 3px 0 var(--main-pink);
  }
`;

const StandRect = styled.div`
  width: 75%;
  height: 175px;
  background: var(--main-pink);
  position: absolute;
  bottom: 0;
  right: 0;

  & > h2 {
    text-transform: uppercase;
    font-size: 30px;
    position: absolute;
    top: 50%;
    transform: translate(-55.25%, -50%);
  }

  @media (max-width: 885px) {
    width: 55%;
  }

  @media (max-width: 700px) {
    height: 150px;
  }

  @media (max-width: 585px) {
    height: 175px;
    width: 65%;

    & > h2 {
      transform: translate(-27%, -50%);
    }
  }
  @media (max-width: 485px) {
    & > h2 {
      top: 60%;
      left: 0%;
    }
  }
`;

const ThirdSlideElements = () => {
  return (
    <SlideContainer>
      <Rect
        color="pink"
        position={`
      top: 120px;
      right: 475px;
      `}
        rotate="45deg"
        className="rect rect-1"
      />
      <Rect
        color="aqua"
        position={`
      top: 50px;
      right: 50px;
      `}
        rotate="45deg"
        className="rect rect-2"
      />
      <SlideInnerContainer>
        <TitleContainer className="title-container">
          <h1>
            better
            <br /> shoes for
            <br /> everyone
          </h1>
        </TitleContainer>
        <LazyLoadImage
          src={shoeImage}
          alt="Shoe"
          className="shoe-image"
          draggable="false"
        />
        <StandRect>
          <h2>Product presentation</h2>
        </StandRect>
      </SlideInnerContainer>
    </SlideContainer>
  );
};

export default ThirdSlideElements;
