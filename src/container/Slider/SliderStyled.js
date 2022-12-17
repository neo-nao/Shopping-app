import styled from "styled-components";

const SliderContainer = styled.section`
  width: 100%;
  height: calc(100vh - 6.25rem);
  background-color: #e1e1e1;
  overflow: hidden;
  position: relative;
`;

const CarouselSlider = styled.div`
  transition: transform 0.5s ease;
  width: 100%;
  height: 100%;
  user-select: none;
  display: flex;
`;

const SliderItem = styled.div`
  width: 100%;
  height: 100%;
  flex-shrink: 0;
`;

const SlideChangeButton = styled.button`
  width: 75px;
  height: 75px;
  background-color: blue;
  position: absolute;
  top: 50%;
  ${(props) =>
    props.direction === "left"
      ? "left:0;"
      : props.direction === "right" && "right:0;"}
  transform:translateY(-50%);
  color: #fff;
  cursor: pointer;
`;

export { SliderContainer, CarouselSlider, SliderItem, SlideChangeButton };
