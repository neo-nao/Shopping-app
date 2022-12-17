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
  ${flexbox({ justify: "space-between" })}

  & > section {
    width: 50%;
    height: 100%;
    padding: 10px;

    @media (min-width: 800px) {
      &:last-child {
        padding-right: 30px;
      }
    }
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
    margin: 30px 0;
  }
  & .about-us-paragraph {
    font-size: 20px;
    color: #515151;
    transition-delay: 0.25s;
  }

  & .text-active {
    transform: translate(0, 0);
    opacity: 1;
  }

  & .image-section {
    position: relative;
  }

  & .image-section::before {
    content: "";
    height: 0;
    width: 3px;
    position: absolute;
    right: 50px;
    background: #313131;
    border-radius: 10px;

    @media (min-width: 801px) {
      top: 50%;
      animation: getTall 0.75s ease-in-out forwards;
    }

    @media (max-width: 800px) {
      animation: getWide 0.75s ease-in-out forwards;
    }
  }

  @keyframes getTall {
    from {
      height: 0;
    }
    to {
      height: 100%;
      top: 0%;
    }
  }
  @keyframes getWide {
    from {
      width: 0%;
    }
    to {
      width: 100%;
    }
  }

  @media (max-width: 800px) {
    flex-direction: column;
    height: 90%;
    max-height: 40rem;

    & .about-us-title,
    & .about-us-paragraph {
      text-align: center;
    }
    & .about-us-title {
      margin-top: 0px;
    }
    & .about-us-paragraph {
      padding: 0 20px;
    }

    & .description-section {
      margin-top: 20px;
    }

    & > section {
      width: 100%;

      &:first-child {
        height: 50%;

        &::before {
          bottom: -10px;
          width: 90%;
          height: 3px;
          left: 50%;
          transform: translateX(-50%);
        }

        & > div {
          height: 100%;

          & > svg {
            width: clamp(2rem, 70%, 10rem);
            height: clamp(2rem, 70%, 10rem);
            margin-top: 20px !important;
          }
        }
      }
    }
  }

  @media (max-width: 500px) {
    & .image-section {
      & svg {
        margin-top: 0 !important;
      }

      &::before {
        bottom: 25px !important;
      }
    }

    & .description-section {
      margin-top: 0;
    }
    height: 95%;
  }

  @media (max-width: 400px) {
    & .image-section {
      height: 30% !important;

      &::before {
        bottom: 10px !important;
      }
    }
  }
`;

const ImageContainer = styled.div`
  height: 100%;
  ${flexbox({ dir: "column" })}

  @media(min-width:800px) {
    & > svg,
    a {
      transform: scale(2.5);
    }
  }

  @media (max-width: 500px) {
    padding: 0;
  }
`;

const DescriptionContainer = styled.section`
  ${flexbox({ dir: "column", justify: "space-between" })}

  & .description-section {
    width: 100%;
    max-height: 500px;
  }

  & .slide-handle-buttons {
    width: 100%;
    ${flexbox({ justify: "space-between" })}
    margin-bottom: 20px;
  }

  @media (max-width: 500px) {
    & .about-us-title {
      font-size: 30px;
      margin-bottom: 20px;
    }

    & .about-us-paragraph {
      padding: 0;
    }

    & .slide-handle-buttons {
      margin-bottom: 10px;
    }
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

const NextDetailListContainer = styled.div`
  width: 100%;
  margin-top: 50px;

  & .next-detail-list {
    flex-wrap: wrap;
    width: 272.5px;
    float: right;
    margin-right: 107.5px;

    & > li {
      width: 100%;
      color: #818181;
      margin: 7.5px;
      font-size: large;
      ${flexbox({ justify: "flex-end" })}

      > svg {
        margin-right: 7.5px;
      }
    }
  }

  @media (max-width: 800px) {
    margin-top: 0;
    & .next-detail-list {
      width: 90%;
      flex-direction: row;
      margin: 25px auto 0;
      float: unset;

      & > li {
        width: unset;
        flex-grow: 1;
        justify-content: center;
      }
    }
  }

  ${(props) =>
    props.id === "outer"
      ? `@media (max-width: 500px){display:none;}
    `
      : props.id === "inner" && `@media (min-width:501px){display:none;}`}
`;

export {
  AboutUsPageLargeContainer,
  AboutUsContainer,
  AboutUsBox,
  ImageContainer,
  DescriptionContainer,
  SlideButton,
  NextDetailListContainer,
};
