import styled from "styled-components";
import { flexbox } from "../../styles/extendableStyles/ExtendableStyles.styled";

const PriceContainer = styled.div`
  width: 50%;
  ${flexbox({ justify: "flex-start" })}

  & :first-child {
    margin-right: 10px;
  }
`;

const PriceTitle = ({ priceType = "USD", onDiscount, children }) => {
  return (
    <h1
      style={{
        textDecoration: onDiscount && "line-through",
        color: onDiscount && "var(--gray)",
      }}
    >
      <span style={{ marginRight: "2.5px" }}>{children}</span>
      {priceType === "USD" && "$"}
    </h1>
  );
};

const Price = ({ isDiscount, offPrice, price }) => {
  return (
    <PriceContainer>
      <PriceTitle priceType="USD" onDiscount={isDiscount}>
        {price}
      </PriceTitle>
      {isDiscount && <PriceTitle priceType="USD">{offPrice}</PriceTitle>}
    </PriceContainer>
  );
};

export default Price;
