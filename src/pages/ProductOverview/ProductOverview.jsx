import { useState, useEffect, useLayoutEffect } from "react";
import { useRouter } from "wouter";
import datas from "../../data/datas";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import AddItemButton from "../../components/AddItemButton/AddItemButton";
import {
  Container,
  AddItemButtonContainer,
} from "./ProductOverviewStyles.styled";
import ContentContainer from "./ContentContainer";
import Loading from "../../components/common/Loading/Loading";
import FullPageHeight from "../../components/common/FullPageHeight/FullPageHeight";

const ProductOverview = ({ params }) => {
  const [product, setProduct] = useState(null);
  const [colorsState, setColorsState] = useState(null);
  const router = useRouter();

  const itemId = Number(params.id);
  const isIdInt = Number.isInteger(itemId);

  useLayoutEffect(() => {
    if (isIdInt) {
      const fetchProduct = () => {
        const item = datas.find((d) => d.id === itemId);

        console.log(item);

        setProduct(item);
      };

      if (!router.itemState) fetchProduct();
      else if (router.itemState && router.itemState.id !== itemId)
        fetchProduct();
      else setProduct(router.itemState);
    }
  }, []);

  const createColors = (colors) => {
    const colorsObj = colors.map((color, idx) => ({
      id: idx,
      color,
      active: false,
    }));

    setColorsState(colorsObj);
  };

  useEffect(() => {
    product && createColors(product.colors);
  }, [product]);

  const handleColorClick = (id) => {
    if (!colorsState.find((c) => c.id === id).active) {
      const colorsCopy = colorsState.map((color) => {
        return { ...color, active: false };
      });

      const clickedColor = colorsCopy.find((color) => color.id === id);
      clickedColor.active = true;

      setColorsState(colorsCopy);
    }
  };

  const renderElements = () => {
    if (!product)
      return (
        <FullPageHeight centerElements>
          <Loading title="Fetching item..." />
        </FullPageHeight>
      );
    if (!colorsState) return;

    const { color } = colorsState.find((c) => c.active) ?? colorsState[0];

    return isIdInt ? (
      <Container>
        <ContentContainer
          item={product}
          colorsState={colorsState}
          handleColorClick={handleColorClick}
        />
        <AddItemButtonContainer>
          <AddItemButton
            itemId={product.id}
            itemColor={color}
            text="Add item"
            activeText="Remove item"
            style={{
              height: "calc(100% - 20px)",
              width: "calc(100% - 20px)",
              fontSize: "22.5px",
            }}
          />
        </AddItemButtonContainer>
      </Container>
    ) : (
      <NotFoundPage />
    );
  };

  return renderElements();
};

export default ProductOverview;
