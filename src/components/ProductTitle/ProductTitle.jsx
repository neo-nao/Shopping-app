import styled from "styled-components";
import { firstLetterUpperCase } from "../../utils/appUtils";
import Stars from "../common/Product/Stars";
import { flexbox } from "../../styles/extendableStyles/ExtendableStyles.styled";

const ProductTitleContainer = styled.div`
  width: 100%;
  margin-top: 15px;
  ${flexbox({ justify: "space-between", align: "center" })}
`;

const ProductTitle = ({ shoe, type, itemStars }) => {
  return (
    <ProductTitleContainer>
      <h1>{firstLetterUpperCase(shoe) ?? firstLetterUpperCase(type)}</h1>
      <Stars filledStars={itemStars} />
    </ProductTitleContainer>
  );
};

export default ProductTitle;
