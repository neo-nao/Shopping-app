import styled from "styled-components";
import { flexbox } from "../../styles/extendableStyles/ExtendableStyles.styled";

const AboutUsPageLargeContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  overflow-y: scroll;
`;

const AboutUsContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: 20rem;
  ${flexbox()};
`;

const AboutUsBox = styled.section`
  width: clamp(15rem, 90%, 50rem);
  height: clamp(17rem, 80%, 30rem);
  border: 2px solid var(--black);
  ${flexbox({ justify: "space-between" })}

  & > section {
    width: 50%;
    height: 100%;
    padding: 10px;
  }

  & .about-us-title,
  & .about-us-paragraph {
    transition: transform 0.4s ease-in-out, opacity 0.4s ease-in-out;
    transform: translate(0, 30px);
    opacity: 0;
  }

  & .about-us-title {
    font-size: 35px;
    text-transform: capitalize;
    margin: 20px 0 30px;
  }
  & .about-us-paragraph {
    font-size: 20px;
    color: #515151;
    transition-delay: 0.3s;
  }

  & .text-active {
    transform: translate(0, 0);
    opacity: 1;
  }

  @media (max-width: 800px) {
    flex-direction: column;
    height: 90%;
    max-height: 40rem;

    & > section {
      width: 100%;

      &:first-child {
        height: 50%;

        & > div {
          height: 100%;
        }
      }
    }
  }
`;

const ImageContainer = styled.div`
  height: 100%;
  ${flexbox()}

  @media(min-width:800px) {
    & > svg,
    a {
      transform: scale(2.5);
    }
  }
`;

const DescriptionContainer = styled.section`
  ${flexbox({ dir: "column", justify: "space-between" })}

  & .description-section {
    width: 100%;

    @media (max-width: 800px) {
      & h1,
      & p {
        text-align: center;
      }
    }
  }

  & .slide-handle-buttons {
    width: 100%;
    ${flexbox({ justify: "space-around" })}
    margin-bottom: 20px;
  }
`;

const SlideButton = styled.button`
  --translate-number: 0;

  transition: color 0.3s ease;
  width: 50px;
  height: 50px;
  background: none;

  &:not(:disabled) {
    cursor: pointer;
  }

  & > svg {
    width: 100%;
    height: 100%;
  }

  &:not(:disabled):first-child:hover svg {
    --translate-number: -3px;

    animation: moveIcon 0.25s linear;
  }
  &:not(:disabled):last-child:hover svg {
    --translate-number: 3px;
    animation: moveIcon 0.25s linear;
  }

  @keyframes moveIcon {
    0% {
      transform: translateX(0);
    }
    50% {
      transform: translateX(var(--translate-number));
    }
    100% {
      transform: translateX(0);
    }
  }
`;

export {
  AboutUsPageLargeContainer,
  AboutUsContainer,
  AboutUsBox,
  ImageContainer,
  DescriptionContainer,
  SlideButton,
};
