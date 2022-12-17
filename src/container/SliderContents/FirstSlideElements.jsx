import { useRef } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import styled from "styled-components";
import shoeImage from "./download.png";
import { placeCenter } from "../../styles/extendableStyles/ExtendableStyles.styled";

const SlideContainer = styled.div`
  width: 100%;
  height: 100%;
  background: var(--white);
  position: relative;
  background: linear-gradient(
    to bottom right,
    var(--black) 50%,
    var(--white) 50%
  );
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    width: 90%;
    height: 75%;
    mix-blend-mode: difference;
    border-top: 20px solid white;
    border-left: 20px solid white;
    top: 10%;
    left: 25px;
  }
  &::after {
    content: "";
    position: absolute;
    width: 90%;
    height: 75%;
    mix-blend-mode: difference;
    border-right: 20px solid white;
    border-bottom: 20px solid white;
    bottom: 10%;
    right: 25px;
  }
`;

const TextContainer = styled.div`
  width: 638px;
  position: absolute;
  mix-blend-mode: difference;
  ${placeCenter()}
  z-index: 1;

  @media (max-width: 800px) {
    width: 65%;
  }
`;

const SlideTitle = styled.h1`
  font-size: 75px;
  color: var(--white);
  text-align: center;
  @media (max-width: 500px) {
    font-size: 35px;
  }
`;

const ShoeImageContainer = styled.div`
  width: clamp(300px, 55vw, 850px);
  height: fit-content;
  position: absolute;
  right: 0;
  bottom: 8vh;

  & .shoe-image {
    width: 100%;
    object-fit: cover;
    filter: drop-shadow(5px 15px 15px rgba(1, 1, 1, 0.3));
  }

  @media (max-width: 900px) {
    min-width: 200px;
    right: 50%;
    transform: translateX(50%);
  } ;
`;

function lerp(start, end, amt) {
  return (1 - amt) * start + amt * end;
}

const FirstSlideElements = () => {
  const imageContainerRef = useRef();

  const windowWidth = window.innerWidth;

  const handleMouseMove = (e) => {
    const x = lerp(
      imageContainerRef.current.style.transform.slice(
        10,
        imageContainerRef.current.style.transform.indexOf(",") - 2
      ),
      e.pageX / (windowWidth / 100) - 25,
      0.1
    );

    const y = lerp(
      imageContainerRef.current.style.transform.slice(
        imageContainerRef.current.style.transform.indexOf(",") + 1,
        -3
      ),
      e.pageY / (windowWidth / 100) - 25,
      0.1
    );

    imageContainerRef.current.style.transform = `translate(${x}px,${y}px)`;
  };

  return (
    <SlideContainer onMouseMove={handleMouseMove}>
      <TextContainer>
        <SlideTitle>Classic black & white</SlideTitle>
      </TextContainer>
      <ShoeImageContainer ref={imageContainerRef}>
        <LazyLoadImage src={shoeImage} alt="shoe" className="shoe-image" />
      </ShoeImageContainer>
    </SlideContainer>
  );
};

export default FirstSlideElements;
