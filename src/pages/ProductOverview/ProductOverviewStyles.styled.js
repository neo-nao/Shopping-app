import styled from "styled-components";
import { flexbox } from "../../styles/extendableStyles/ExtendableStyles.styled";

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px 0 0;

  & > .page-content-container {
    margin: auto;
    width: 92.5%;
  }

  & .item-title {
    font-size: 35px;
    padding-top: 1rem;
  }

  & .item-rates {
    margin: 1rem 0;
    ${flexbox({ justify: "space-between" })}
  }

  @media (min-width: 750px) {
    & .slider-container {
      width: 400px;
      height: 400px;
    }

    & .item-details-container {
      ${flexbox()}
    }

    & .item-details-section {
      height: 100%;
      flex-grow: 1;
      margin-left: 20px;
    }
  }

  @media (min-width: 950px) {
    width: clamp(375px, 80%, 1500px);
    margin: auto;
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 300px;
  user-select: none;

  .item-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (min-width: 950px) {
    height: 100%;
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
`;

export { Container, ImageContainer, AddItemButtonContainer };
