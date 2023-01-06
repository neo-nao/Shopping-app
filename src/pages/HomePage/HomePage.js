import Slider from "../../container/Slider/Slider";
import FirstSlideElements from "../../container/SliderContents/FirstSlideElements";
import SecondSlideElements from "../../container/SliderContents/SecondSlideElements";
import ThirdSlideElements from "../../container/SliderContents/ThirdSlideElements";
import OfferPreview from "./OfferPreview";

const HomePage = () => {
  return (
    <div>
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
      />
      <OfferPreview />
    </div>
  );
};

export default HomePage;
