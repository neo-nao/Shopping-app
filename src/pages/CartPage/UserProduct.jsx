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
import { useDispatch, useSelector } from "react-redux";
import { removeUserItemPending } from "../../redux/user/userSlice";

const UserProduct = ({ product }) => {
  const userToken = useSelector((state) => state.user.user.userToken);
  const dispatch = useDispatch();

  const handleRemoveItem = () => {
    dispatch(removeUserItemPending({ userToken, productID: product.id }));
  };

  return (
    <UserProductContainer className={`user-item-${product.id}`}>
      <ImageContainer
        style={{ backgroundImage: `url('${product.shoeImage}')` }}
      ></ImageContainer>
      <DetailsContainer>
        <ul style={{ width: "100%" }}>
          <li>
            <ProductTitle>{product.shoe ?? product.type}</ProductTitle>
          </li>
          <li style={{ marginTop: "20px" }}>
            <ProductParagraph>Category : {product.category}</ProductParagraph>
          </li>
          <li>
            <ProductParagraph>
              Color : {product.color.join(", ")}
            </ProductParagraph>
          </li>
        </ul>
        <ItemIntegrationContainer>
          <h2>{product.price}$</h2>
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
