import { useState, useLayoutEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import FullPageHeight from "../../components/common/FullPageHeight/FullPageHeight";
import { fetchFunc } from "../../services/requestServices";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import ProductTitle from "../../components/ProductTitle/ProductTitle";

const Container = styled.div`
  width: 92.5%;
  height: 90%;
  border: 2px solid #c1c1c1;
  padding: 10px;
  margin: auto;
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 300px;

  .item-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ProductOverview = () => {
  const [product, setProduct] = useState(null);
  const params = useParams();
  const { state } = useLocation();

  const itemId = Number(params.id);
  const isIdInt = Number.isInteger(itemId);

  useLayoutEffect(() => {
    const fetchProduct = async (id) => {
      const response = await fetchFunc("/products/" + id);

      setProduct(response);
    };
    if (isIdInt) {
      fetchProduct(itemId);
    }
  }, []);

  const renderElements = () => {
    const currentState = state ?? product;
    const {
      type,
      shoe,
      price,
      isDiscount,
      offPrice,
      priceType,
      shoeImage,
      itemStars,
    } = currentState;

    return isIdInt ? (
      currentState && (
        <Container>
          <ImageContainer>
            <img src={shoeImage} alt="shoe" className="item-img" />
          </ImageContainer>
          <ProductTitle shoe={shoe} type={type} itemStars={itemStars} />
        </Container>
      )
    ) : (
      <NotFoundPage />
    );
  };

  return <FullPageHeight>{renderElements()}</FullPageHeight>;
};

export default ProductOverview;
