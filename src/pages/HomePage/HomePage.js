import Slider from "../../container/Slider/Slider";

const HomePage = () => {
  return (
    <div>
      <Slider
        items={[
          { id: 1, color: "red" },
          { id: 2, color: "yellow" },
          { id: 3, color: "green" },
        ]}
      />
    </div>
  );
};

export default HomePage;
