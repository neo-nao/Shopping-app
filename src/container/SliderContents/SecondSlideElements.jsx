import { useEffect, useRef } from "react";
import styled from "styled-components";
import { SlideContainer } from "../../styles/Elements/SliderElements";
import bgImage from "../../assets/images/fluid-gradient-1.jpg";
import { LazyLoadImage } from "react-lazy-load-image-component";
import shoeImage from "./download (1).png";
import { placeCenter } from "../../styles/extendableStyles/ExtendableStyles.styled";

const SecondSlideContainer = styled(SlideContainer)`
  background-image: url(${bgImage});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  user-select: none;

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

const TitleContainer = styled.div`
  font-size: clamp(25px, 10vw, 75px);
  color: var(--white);
  text-shadow: 2px 2px var(--gray);
  display: inline-block;
  overflow: hidden;
  position: absolute;
  ${placeCenter()}
  ${(props) =>
    props.id === 1
      ? `
  top: 40%;
  left: 50%;
  `
      : `
  top: 60%;
  left: 50%;
  `}

  & > h1 {
    transform: ${(props) =>
      props.id === 1 ? "translateX(100%)" : "translateX(-100%)"};
  }

  &.text-active {
    transition: left 1.25s ease;
    left: ${(props) =>
      props.id === 1 ? "calc(50% - 265px)" : "calc(50% + 240px)"};
  }

  &.text-active > h1 {
    transition: transform 1.75s ease;
    transition-delay: 0.2s;
    transform: translateX(0);
  }
`;

const options = { root: null, threshold: 0.1 };

const SecondSlideElements = () => {
  const slideContainerRef = useRef();
  const title1Ref = useRef();
  const title2Ref = useRef();

  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      title1Ref.current.classList.add("text-active");
      title2Ref.current.classList.add("text-active");
    } else {
      title1Ref.current.classList.remove("text-active");
      title2Ref.current.classList.remove("text-active");
    }
  }, options);

  useEffect(
    () => observer.observe(slideContainerRef.current),
    [slideContainerRef.current]
  );

  return (
    <SecondSlideContainer ref={slideContainerRef}>
      <TitleContainer id={1} ref={title1Ref}>
        <h1>Niker</h1>
      </TitleContainer>
      <TitleContainer id={2} ref={title2Ref}>
        <h1>Stay fit</h1>
      </TitleContainer>
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
