import styled from "styled-components";
import { Link } from "react-router-dom";
import {
  flexbox,
  placeCenter,
} from "../../styles/extendableStyles/ExtendableStyles.styled";
import Button from "../../components/common/Button/Button";
import PlusPattern from "../../components/PlusPattern/PlusPattern";
import ProductSlider from "../../container/ProductSlider/ProductsSlider";

const SpecialOfferSection = styled.section`
  width: 100%;
  height: 100vh;
  ${flexbox()}
  position:relative;

  & > div {
    width: 50%;
    height: 100%;
    position: relative;

    &:first-child {
      min-height: 600px;
    }
  }

  & .product-preview-container {
    ${flexbox()}
  }

  @media (max-width: 1050px) {
    height: fit-content;
    flex-direction: column;

    & > div {
      width: 100%;
      height: 550px;
    }
  }
`;

const OfferTitle = styled.div`
  width: clamp(200px, 100%, 350px);
  height: 350px;
  position: absolute;
  ${placeCenter()}
  text-align:center;

  & h1 {
    height: 65%;
    ${flexbox({ dir: "column", justify: "center" })}
    font-size: 100px;
    text-transform: uppercase;
    margin-top: 30px;

    span:first-child {
      font-size: 30px;
      font-weight: 600;
    }
    span:last-child {
      font-size: 25px;
      font-weight: 500;
    }
  }

  @media (max-width: 1050px) {
  }
`;

const productDatas = [
  {
    id: 1,
    category: "daily usage",
    type: "oldSchool",
    shoe: "old school",
    color: ["white"],
    shoeImage: "https://s2.uupload.ir/files/oldschool-whiteblack_(2)_pmy.jpg",
    price: "119.9",
    isDiscount: true,
    offPrice: "59.9",
    priceType: "USD",
    itemStars: 4.5,
  },
  {
    id: 2,
    category: "hiking",
    type: "work boots",
    color: ["black", "white", "brown"],
    shoeImage: "https://s2.uupload.ir/files/sneaker-blackwhitebrown-1_p68h.jpg",
    price: "100",
    isDiscount: true,
    offPrice: "70",
    priceType: "USD",
    itemStars: 3.5,
  },
  {
    id: 3,
    category: "dancing",
    type: "chuck taylor",
    color: ["black", "white"],
    shoeImage: "https://s2.uupload.ir/files/sneaker-blackwhite-1_(1)_vyp.jpg",
    price: "62.19",
    isDiscount: true,
    offPrice: "42.5",
    priceType: "USD",
    itemStars: 4,
  },
  {
    id: 4,
    category: "dancing",
    type: "sneaker",
    color: ["dark brown", "white"],
    shoeImage: "https://s2.uupload.ir/files/sneaker-darkbrown_(1)_z0y7.jpg",
    price: "49.9",
    isDiscount: true,
    offPrice: "35",
    priceType: "USD",
    itemStars: 3,
  },
];

const OfferPreview = () => {
  return (
    <SpecialOfferSection>
      <div className="offer-title-container">
        <OfferTitle>
          <h1>
            <span>special</span>
            offer
            <span>get up to 60% off</span>
          </h1>
          <Link to="/special-offers" style={{ display: "inline-block" }}>
            <Button
              style={{
                fontSize: "20px",
                fontWeight: "900",
                padding: "6px 7.5px",
                borderWidth: "3.5px",
                margin: "auto",
              }}
            >
              SHOP NOW
            </Button>
          </Link>
        </OfferTitle>
        <PlusPattern
          cssStyle={`top: 65%;
        left: 12.5%;
        z-index: -1;
        @media (max-width:400px){
          left: 5%;
          top: 75%;
        }
        `}
        />
        <PlusPattern
          cssStyle={`top: 12.5%;
        left: 65%;
        z-index: -1;

        @media (max-width:400px){
          left:unset;
          right: 5%;
          top: 5%;
        }
        `}
        />
      </div>
      <div className="product-preview-container">
        <ProductSlider products={productDatas} />
      </div>
    </SpecialOfferSection>
  );
};

export default OfferPreview;
