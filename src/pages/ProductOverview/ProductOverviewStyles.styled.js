import styled from "styled-components";
import { flexbox } from "../../styles/extendableStyles/ExtendableStyles.styled";

const Container = styled.div`
  & > .page-content-container {
    margin: 0 auto 30px;
    width: 92.5%;
  }

  & .slider-image-container {
    height: 300px;
    cursor: grab;

    &:active {
      cursor: grabbing;
    }
  }

  & .item-title {
    font-size: 35px;
    padding-top: 1rem;
  }

  & .item-rates {
    margin: 1rem 0;
    ${flexbox({ justify: "space-between" })}
  }

  & .add-item-button-container {
    display: none;
    margin-top: 25px;
  }

  @media (min-width: 375px) {
    & .slider-image-container {
      height: 80vw;
    }
  }

  @media (min-width: 700px) {
    & .slider-image-container {
      width: 350px;
      height: 350px;
      max-width: 400px;
      flex-grow: 3;
      flex-shrink: 0;
    }

    & .item-details-container {
      ${flexbox({ align: "flex-start" })}
    }

    & .item-details-section {
      height: 100%;
      margin-left: 20px;
    }

    & .add-item-button-container {
      display: block;
    }
  }

  @media (min-width: 950px) {
    & .page-content-container {
      width: clamp(375px, 80%, 1500px);
    }

    & .slider-image-container {
      width: 400px;
      height: 400px;
    }

    & .item-details-section {
      margin-left: 30px;
    }
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 100%;
  user-select: none;

  .item-img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const AddItemButtonContainer = styled.div`
  position: sticky;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 75px;
  border-top: 2px solid var(--gray);
  background: var(--white);
  margin-top: 25px;
  ${flexbox()}
  z-index:2;

  @media (min-width: 700px) {
    display: none;
  }
`;

export { Container, ImageContainer, AddItemButtonContainer };
