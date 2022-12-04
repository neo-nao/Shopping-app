import { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Navbar from "../../components/Header/Navbar";
import { flexbox } from "../../styles/extendableStyles/ExtendableStyles.styled";
import Profile from "../../components/Header/Profile";
import { disableScroll, enableScroll } from "../../utils/appUtils";

const Slider = styled.section`
  transform: translateY(-100%);
  transition: transform 0.35s ease-in-out;
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(3px);
  color: var(--gray);
  z-index: 5;
  ${flexbox({ dir: "column" })}

  &.opened {
    transform: translateY(0);
  }

  @media (min-width: 650px) {
    display: none;
  }
`;

const SliderMenu = ({ navDatas }) => {
  const isMenuOpened = useSelector(
    (state) => state.elements.isMobileMenuOpened
  );

  useEffect(() => {
    isMenuOpened ? disableScroll() : enableScroll();
  }, [isMenuOpened]);

  return (
    <Slider className={isMenuOpened ? "opened" : ""}>
      <Profile />
      <Navbar navDatas={navDatas} direction="vertical" />
    </Slider>
  );
};

export default SliderMenu;
