import { useEffect, useRef } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import styled from "styled-components";
import shoeImage from "../../assets/SlideImages/slide-shoe-img-2.png";
import { placeCenter } from "../../styles/extendableStyles/ExtendableStyles.styled";
import ButtonOutlined from "../../components/ButtonOutlined/ButtonOutlined";
import { themes } from "../../components/ButtonOutlined/ButtonOutlined";
import { SlideContainerStyle } from "../../styles/Elements/SliderElements";
import { getWindowDimensions } from "../../hooks/useWindowDimensions";
import { Link } from "wouter";

const windowDimensions = getWindowDimensions();

const FirstSlideContainer = styled(SlideContainerStyle)`
  background: linear-gradient(
    to bottom right,
    var(--black) 50%,
    var(--white) 50%
  );
  user-select: none;

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
  overflow: hidden;
  z-index: 1;

  @media (max-width: 800px) {
    width: 65%;
  }
`;

const SlideTitle = styled.h1`
  font-size: 75px;
  color: var(--white);
  text-align: center;
  transform: translateX(-100%);

  &.slide-active {
    transition: transform 1s ease;
    transition-delay: 0.25s;
    transform: translateX(0);
  }

  @media (max-width: 500px) {
    font-size: 35px;
  }
`;

const ShoeImageContainer = styled.div`
  --img-width: 55vw;
  width: clamp(350px, 55vw, 850px);
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
    --img-width: 600px;
    width: var(--img-width);
    right: calc(${windowDimensions.width / 2}px - (var(--img-width) / 2));
  }

  @media (max-width: 520px) {
    --img-width: 500px;
  }
  @media (max-width: 425px) {
    --img-width: 400px;
  }
  @media (max-width: 335px) {
    --img-width: 110%;
  }
`;

function lerp(start, end, amt) {
  return (1 - amt) * start + amt * end;
}

const FirstSlideElements = () => {
  const slideContainerRef = useRef();
  const imageContainerRef = useRef();
  const titleRef = useRef();

  const handleMouseMove = (e) => {
    if (windowDimensions.width > 900) {
      const x = lerp(
        imageContainerRef.current.style.transform.slice(
          10,
          imageContainerRef.current.style.transform.indexOf(",") - 2
        ),
        e.pageX / (windowDimensions.width / 100) - 25,
        0.1
      );

      const y = lerp(
        imageContainerRef.current.style.transform.slice(
          imageContainerRef.current.style.transform.indexOf(",") + 1,
          -3
        ),
        e.pageY / (windowDimensions.width / 100) - 25,
        0.1
      );

      imageContainerRef.current.style.transform = `translate(${x}px,${y}px)`;
    }
  };

  const options = { root: null, threshold: 0.1 };

  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      titleRef.current.classList.add("slide-active");
    } else {
      slideContainerRef.current &&
        titleRef.current.classList.remove("slide-active");
    }
  }, options);

  useEffect(
    () =>
      slideContainerRef.current && observer.observe(slideContainerRef.current),
    [slideContainerRef.current]
  );

  return (
    <FirstSlideContainer onMouseMove={handleMouseMove} ref={slideContainerRef}>
      <Link href="/products/1">
        <ButtonOutlined
          {...(windowDimensions.width > 900
            ? themes.reverseBlack
            : themes.reverseWhite)}
          width="clamp(2rem,65%,400px)"
          cssStyle={`
          position: absolute;
          top: 75%;
          left: 50%;
          transform: translateX(-50%);
          z-index: 1;    
          
          @media (max-width:900px){
            mix-blend-mode:difference;
            top:20%;
          }
        `}
        >
          Order
        </ButtonOutlined>
      </Link>
      <TextContainer>
        <SlideTitle ref={titleRef}>Classic black & white</SlideTitle>
      </TextContainer>
      <ShoeImageContainer ref={imageContainerRef}>
        <LazyLoadImage
          src={shoeImage}
          alt="shoe"
          className="shoe-image"
          draggable="false"
        />
      </ShoeImageContainer>
    </FirstSlideContainer>
  );
};

export default FirstSlideElements;
