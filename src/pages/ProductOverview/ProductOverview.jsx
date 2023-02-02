import { useState, useEffect, useLayoutEffect } from "react";
import { useRouter } from "wouter";
import { fetchFunc } from "../../services/requestServices";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import Slider from "../../container/Slider/Slider";
import { firstLetterUpperCase } from "../../utils/appUtils";
import Stars from "../../components/common/Product/Stars";
import Price from "../../components/Price/Price";
import AddItemButton from "../../components/AddItemButton/AddItemButton";
import ItemColors from "../../components/ItemColors/ItemColors";
import ItemDescription from "../../components/ItemDescription/ItemDescription";
import {
  Container,
  ImageContainer,
  AddItemButtonContainer,
} from "./ProductOverviewStyles.styled";

const ProductOverview = ({ params }) => {
  const [product, setProduct] = useState(null);
  const [colorsState, setColorsState] = useState(null);
  const router = useRouter();

  const itemId = Number(params.id);
  const isIdInt = Number.isInteger(itemId);

  useLayoutEffect(() => {
    if (isIdInt) {
      if (!router.itemState) {
        const fetchProduct = async (id) => {
          const response = await fetchFunc("/products/" + id);

          setProduct(response);
        };
        fetchProduct(itemId);
      } else setProduct(router.itemState);
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
    const colorsCopy = colorsState.map((color) => {
      return { ...color, active: false };
    });

    const clickedColor = colorsCopy.find((color) => color.id === id);
    clickedColor.active = true;

    setColorsState(colorsCopy);
  };

  const renderElements = () => {
    if (!product) return;

    const { type, shoe, price, priceType, shoeImages, itemStars } = product;

    return isIdInt ? (
      <Container>
        <div className="page-content-container">
          <div className="item-details-container">
            <div className="slider-container">
              <Slider
                items={shoeImages.map((shoeImage, idx) => ({
                  id: "slide-" + idx,
                  innerElement: (
                    <ImageContainer>
                      <img
                        src={shoeImage}
                        alt="shoe"
                        className="item-img"
                        draggable="false"
                      />
                    </ImageContainer>
                  ),
                }))}
                touchable
              />
            </div>
            <section className="item-details-section">
              <h1 className="item-title">
                {firstLetterUpperCase(shoe ?? type)}
              </h1>
              <div className="item-rates">
                <Price price={price} priceType={priceType} fontSize="27.5px" />
                <Stars filledStars={itemStars} />
              </div>
              {colorsState && (
                <ItemColors
                  colors={colorsState}
                  handleColorClick={handleColorClick}
                />
              )}
              <ItemDescription style={{ marginTop: "1.5rem" }}>
                A great, awesome-designed and comfortable shoe that fits your
                feet and makes you feel motivated and ready to go for work out.
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Aliquam, nostrum. Nam dignissimos tenetur amet vel, non sed
                quidem id provident. Lorem, ipsum dolor sit amet consectetur
                adipisicing elit. Recusandae, temporibus? Eaque alias, eum
                adipisci incidunt omnis rem officiis obcaecati unde.
              </ItemDescription>
              <div className="add-item-button-container">
                <AddItemButton
                  itemId={product.id}
                  text="Add item"
                  activeText="Remove item"
                  style={{
                    height: "45px",
                    width: "100%",
                    fontSize: "22.5px",
                  }}
                />
              </div>
            </section>
          </div>
        </div>
        <AddItemButtonContainer>
          <AddItemButton
            itemId={product.id}
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
