import { memo } from "react";
import {
  UserProductContainer,
  ImageContainer,
  DetailsContainer,
  ProductTitle,
  ProductParagraph,
  ItemIntegrationContainer,
  ItemCounterContainer,
  DeleteItemButton,
} from "../../styles/Elements/CartPageElements.styled";
import ProductQuantity from "../../components/ProductQuantity/ProductQuantity";
import { FaTrashAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { removeItem } from "../../redux/user/userSlice";

const PriceContainer = styled.div`
  width: calc(100% - 200px);
  position: relative;

  & .off-price {
    position: absolute;
    top: -150%;
  }

  & .original-price {
    color: var(--gray);
    text-decoration: line-through;
  }

  @media (max-width: 645px) {
    width: 100%;
  }
`;

const UserProduct = ({ userItem: { product, color } }) => {
  const dispatch = useDispatch();

  const handleRemoveItem = () => dispatch(removeItem(product.id));

  if (!product) return <h1>loading...</h1>;

  return (
    <UserProductContainer className={`user-item-${product.id}`}>
      <ImageContainer
        style={{
          backgroundImage: `url('${product.shoeImages[0]}')`,
        }}></ImageContainer>
      <DetailsContainer>
        <ul style={{ width: "100%" }}>
          <li>
            <ProductTitle>{product.shoe ?? product.type}</ProductTitle>
          </li>
          <li style={{ marginTop: "20px" }}>
            <ProductParagraph>Category : {product.category}</ProductParagraph>
          </li>
          <li>
            <ProductParagraph>Color : {color}</ProductParagraph>
          </li>
        </ul>
        <ItemIntegrationContainer>
          <PriceContainer>
            {product.offPrice ? (
              <>
                <h2 className="off-price">{product.offPrice} $</h2>
                <h3 className="original-price">{product.price} $</h3>
              </>
            ) : (
              <h2>{product.price} $</h2>
            )}
          </PriceContainer>
          <ItemCounterContainer>
            <DeleteItemButton onClick={handleRemoveItem}>
              <FaTrashAlt />
            </DeleteItemButton>
            <ProductQuantity
              productID={product.id}
              rounded
              outline="outline"
              stretch
            />
          </ItemCounterContainer>
        </ItemIntegrationContainer>
      </DetailsContainer>
    </UserProductContainer>
  );
};

export default memo(UserProduct);
