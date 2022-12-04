import styled from "styled-components";
import {
  containerWidth,
  flexbox,
} from "../../styles/extendableStyles/ExtendableStyles.styled";

const UserProductsContainer = styled.div`
  ${containerWidth()}
  position: relative;
  margin: 20px auto;

  & > section {
    display: inline-block;

    &:first-child {
      width: calc(100% - 25rem);
    }
    &:last-child {
      width: 25rem;
      height: 100%;
      position: absolute;
    }

    @media (max-width: 1100px) {
      &:first-child {
        width: calc(100% - 17.5rem);
      }
      &:last-child {
        width: 17.5rem;
      }
    }

    @media (max-width: 965px) {
      display: block;
      width: 100% !important;
      height: fit-content !important;
      position: static !important;
    }
  }

  @media (max-width: 965px) {
    ${flexbox({ dir: "column", justify: "flex-start" })}

    & > section:first-child {
      order: 1;
      margin-top: 50px;
    }
  }
`;

const UserCheckoutSection = styled.aside`
  width: 95%;
  height: 22.5rem;
  position: sticky;
  top: 131px;
  left: 100%;
  border: 2px solid var(--black);
  padding: 7.5px;

  > * {
    width: 100%;
  }

  @media (max-width: 965px) {
    width: 100%;
    height: 25rem;
    position: static;
  }
`;

const ItemDetails = styled.div`
  @property --color-var {
    syntax: "<color>";
    inherits: true;
    initial-value: rgba(122, 122, 122, 0);
  }

  height: 65%;
  overflow-y: scroll;
  border-bottom: 1px solid var(--gray);
  padding: 2.5px 7.5px;
  animation: fadeout 0.25s linear forwards;

  &::-webkit-scrollbar {
    width: 3px;
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 2rem;
    background: var(--color-var);
  }

  &:hover {
    animation: fadein 0.25s linear forwards;
  }

  @keyframes fadein {
    from {
      --color-var: rgba(122, 122, 122, 0);
    }
    to {
      --color-var: rgba(122, 122, 122, 1);
    }
  }
  @keyframes fadeout {
    from {
      --color-var: rgba(122, 122, 122, 1);
    }
    to {
      --color-var: rgba(122, 122, 122, 0);
    }
  }

  @media (max-width: 965px) {
    height: 70%;
  }
`;

const TotalPriceDescription = styled.div`
  padding: 22.5px 0;
  ${flexbox({ justify: "space-between" })}

  @media (max-width: 965px) {
    padding: 20.75px 0;
  }
`;

const UserProductContainer = styled.div`
  transition: background 0.5s ease, border-color 1.25s ease;
  width: 100%;
  height: 15rem;
  margin: 10px 0;
  border: 2px solid var(--black);
  padding: 10px;
  ${flexbox()}

  &.item-press-active {
    background: #e1e1e1;
    border-color: var(--gray);
  }

  @media (max-width: 645px) {
    height: 37.5rem;
    ${flexbox({ dir: "column" })}
  }
`;

/*
===========================================
         User cart item elements
===========================================
*/

const ImageContainer = styled.div`
  width: 215px;
  height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;

  @media (max-width: 645px) {
    width: 100%;
  }
`;

const DetailsContainer = styled.div`
  width: calc(100% - 225px);
  height: 100%;
  padding: 10px 0 10px 20px;
  ${flexbox({ dir: "column", justify: "space-between", align: "flex-start" })}

  @media (max-width: 645px) {
    width: 100%;
    height: 100%;
    padding: 10px;
  }

  @media (max-width: 400px) {
    padding: 10px 0;
  }
`;

const ProductTitle = styled.h1`
  font-size: 30px;
  text-transform: capitalize;
`;

const ProductParagraph = styled.p`
  font-size: 16.5px;
  margin: 10px 0;
  color: var(--gray);
`;

const ItemIntegrationContainer = styled.div`
  width: 100%;
  ${flexbox({ justify: "space-between" })}

  @media (max-width: 645px) {
    flex-direction: column;

    & > h2 {
      width: 100%;
      text-align: start;
    }
  }
`;

const ItemCounterContainer = styled.div`
  width: 200px;
  display: flex;
  justify-content: space-between;

  @media (max-width: 645px) {
    width: 100%;
    flex-direction: column;
    align-items: stretch;
    margin-top: 10px;
  }
`;

const DeleteItemButton = styled.button`
  transition: var(--color-transition);
  width: 35px;
  height: 35px;
  background: var(--white);
  border: 1px solid var(--black);
  border-radius: 5px;
  ${flexbox()}
  cursor:pointer;

  &:hover {
    background: var(--black);
    color: var(--white);
  }

  @media (max-width: 645px) {
    width: unset;
    margin-bottom: 10px;
  }
`;

/*
===========================================
      Quantity counter comp elements
===========================================
*/

const QuantityContainer = styled.div`
  display: flex;
  height: 35px;
  overflow: hidden;

  ${(props) =>
    props.stretch &&
    `
  @media (max-width: 645px) {
  width:100%;
  
  & > *{
    width: calc(100% / 3) !important;
  }
}
`}
`;

const QuantityButton = styled.button`
  width: 45px;
  height: 100%;
  background: var(--black);
  color: var(--white);
  ${flexbox()}
  font-size: 13px;
  cursor: pointer;
  ${({ dir, rounded, outline }) =>
    dir === "left"
      ? `
    ${
      rounded &&
      `border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;`
    }
    ${
      outline === "outline" &&
      `
    border-top:2px solid var(--black);
    border-left:2px solid var(--black);
    border-bottom:2px solid var(--black);
  `
    }
    `
      : dir === "right" &&
        `
      ${
        rounded &&
        `border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;`
      }
      ${
        outline === "outline" &&
        `
      border-top:2px solid var(--black);
      border-right:2px solid var(--black);
      border-bottom:2px solid var(--black);
    `
      }
      `}
  ${(props) =>
    props.outline === "outline" &&
    `
    transition:var(--color-transition);
  background:var(--white);
  color:var(--black);

  &:hover{
    background:var(--black);
    color:var(--white);
  }
  `}
`;

const QuantityCounter = styled.div`
  width: 55px;
  height: 100%;
  text-align: center;
  ${flexbox()}
  border: 2px solid var(--black);
`;

export {
  UserProductsContainer,
  UserCheckoutSection,
  ItemDetails,
  TotalPriceDescription,
  UserProductContainer,
  ImageContainer,
  DetailsContainer,
  ProductTitle,
  ProductParagraph,
  ItemIntegrationContainer,
  ItemCounterContainer,
  DeleteItemButton,
  QuantityContainer,
  QuantityButton,
  QuantityCounter,
};
