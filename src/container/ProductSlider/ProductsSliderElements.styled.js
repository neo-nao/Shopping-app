import styled from "styled-components";
import { flexbox } from "../../styles/extendableStyles/ExtendableStyles.styled";

const SliderContainer = styled.div`
  width: clamp(250px, 100%, 500px);
  height: 500px;
  ${flexbox({ dir: "column" })}

  & .handle-slide-btns-container {
    margin-top: 30px;
    width: 100%;
    ${flexbox({ justify: "space-around" })}
  }
`;

const SliderInnerContainer = styled.div`
  width: clamp(175px, 65%, 350px);
  height: 400px;
  position: relative;

  & .product-slide {
    width: 100%;
    height: 100%;
    position: absolute;

    & > * {
      height: 100%;
    }

    @media (max-width: 400px) {
      & .item-integration-container {
        align-items: flex-end;
      }

      & .price-container {
        flex-direction: column;
        align-items: flex-start;
      }
    }
  }

  & .current-slide {
    z-index: 2;

    &.slide-left {
      animation: current-slide-left 0.6s ease forwards;
    }
    &.slide-right {
      animation: current-slide-right 0.6s ease forwards;
    }

    @keyframes current-slide-left {
      from {
        transform: translate(0) scale(1);
      }
      to {
        transform: translateX(35%) scale(0.75);
        z-index: 2;
      }
    }
    @keyframes current-slide-right {
      from {
        transform: translate(0) scale(1);
      }
      to {
        transform: translateX(-35%) scale(0.75);
        z-index: 2;
      }
    }
  }

  & .previous-slide {
    top: 50%;
    left: -35%;
    transform: translateY(-50%) scale(0.75);

    &.slide-left {
      animation: previous-slide-left 0.6s ease forwards;
    }
    &.slide-right {
      animation: previous-slide-right 0.6s ease forwards;
    }

    @keyframes previous-slide-left {
      from {
        transform: translate(0, -50%) scale(0.75);
      }
      to {
        transform: translate(35%, -50%) scale(1);
        z-index: 3;
      }
    }
    @keyframes previous-slide-right {
      from {
        transform: translateY(-50%) scale(0.75);
      }
      to {
        transform: translate(35%, -50%) scale(0.75);
      }
    }
  }

  & .next-slide {
    top: 50%;
    right: -35%;
    transform: translateY(-50%) scale(0.75);

    &.slide-left {
      animation: next-slide-left 0.6s ease forwards;
    }
    &.slide-right {
      animation: next-slide-right 0.6s ease forwards;
    }

    @keyframes next-slide-left {
      from {
        transform: translateY(-50%) scale(0.75);
      }
      to {
        transform: translate(-35%, -50%) scale(0.75);
      }
    }
    @keyframes next-slide-right {
      from {
        transform: translateY(-50%) scale(0.75);
      }
      to {
        transform: translate(-35%, -50%) scale(1);
        z-index: 3;
      }
    }
  }

  & .upcoming-slide {
    top: 50%;
    right: 0;
    transform: translateY(-50%) scale(0.75);
    z-index: -1;

    &.slide-left {
      animation: upcoming-slide-left 0.6s ease forwards;
    }
    &.slide-right {
      animation: upcoming-slide-right 0.6s ease forwards;
    }

    @keyframes upcoming-slide-left {
      from {
        transform: translateY(-50%) scale(0.75);
      }
      to {
        transform: translate(-35%, -50%) scale(0.75);
      }
    }
    @keyframes upcoming-slide-right {
      from {
        transform: translateY(-50%) scale(0.75);
      }
      to {
        transform: translate(35%, -50%) scale(0.75);
      }
    }
  }
`;

const SlideButton = styled.button`
  width: 50px;
  height: 50px;
  z-index: 1;
  font-size: 45px;
  color: #313131;
  cursor: pointer;
  background: none;
  ${flexbox()}

  svg {
    transition: transform 0.1s ease;
  }

  &:active svg {
    transform: scale(0.9);
  }
`;

export { SliderContainer, SliderInnerContainer, SlideButton };
