import styled from "styled-components";
import { flexbox } from "../../styles/extendableStyles/ExtendableStyles.styled";

const PriceContainer = styled.div`
  width: 50%;
  ${flexbox({ justify: "flex-start" })}

  & :first-child {
    margin-right: 10px;
  }
`;

const PriceTitle = ({ priceType, onDiscount, fontSize = "20px", children }) => {
  return (
    <h2
      style={{
        textDecoration: onDiscount && "line-through",
        color: onDiscount && "var(--gray)",
        fontSize,
      }}
    >
      <span style={{ marginRight: "2.5px" }}>{children}</span>
      {priceType === "USD" && "$"}
    </h2>
  );
};

const Price = ({
  isDiscount,
  offPrice,
  price,
  priceType = "USD",
  fontSize,
}) => {
  return (
    <PriceContainer className="price-container">
      <PriceTitle
        priceType={priceType}
        onDiscount={isDiscount}
        fontSize={fontSize}
      >
        {price}
      </PriceTitle>
      {isDiscount && <PriceTitle priceType={priceType}>{offPrice}</PriceTitle>}
    </PriceContainer>
  );
};

export default Price;
