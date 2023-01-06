import styled from "styled-components";
import {
  flexbox,
  placeCenter,
} from "../../styles/extendableStyles/ExtendableStyles.styled";
import Button from "../../components/common/Button/Button";
import PlusPattern from "../../components/PlusPattern/PlusPattern";

const SpecialOfferSection = styled.section`
  width: 100%;
  height: 100vh;
  ${flexbox()}

  & > div {
    width: 50%;
    height: 100%;
    position: relative;
  }
`;

const OfferTitle = styled.div`
  width: 350px;
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
`;

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
        </OfferTitle>
        <PlusPattern
          position={`top: 65%;
        left: 12.5%;`}
        />
        <PlusPattern
          position={`top: 12.5%;
        left: 65%;`}
        />
      </div>
      <div className="product-preview-container"></div>
    </SpecialOfferSection>
  );
};

export default OfferPreview;
