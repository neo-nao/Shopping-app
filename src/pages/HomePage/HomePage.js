import styled from "styled-components";
import Slider from "../../container/Slider/Slider";
import FirstSlideElements from "../../container/SliderContents/FirstSlideElements";
import SecondSlideElements from "../../container/SliderContents/SecondSlideElements";
import ThirdSlideElements from "../../container/SliderContents/ThirdSlideElements";
import OfferPreview from "./OfferPreview";

const HomeSliderContainer = styled.div`
  height: calc(100vh - 6.25rem);
`;

const HomePage = () => {
  return (
    <>
      <HomeSliderContainer>
        <Slider
          items={[
            { id: 1, innerElement: <FirstSlideElements /> },
            {
              id: 2,
              innerElement: <SecondSlideElements />,
            },
            {
              id: 3,
              innerElement: <ThirdSlideElements />,
            },
          ]}
          controlButtons
        />
      </HomeSliderContainer>
      <OfferPreview />
    </>
  );
};

export default HomePage;
