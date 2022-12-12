import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  flexbox,
  containerWidth,
} from "../../styles/extendableStyles/ExtendableStyles.styled";
import Logo from "../common/Logo/Logo";
import Navbar from "./Navbar";
import Profile from "./Profile";
import MobileMenu from "./MobileMenu";

const HeaderStyled = styled.header`
  transition: background-color 0.6s ease, height 0.35s ease;
  width: 100%;
  height: 5rem;
  background-color: rgba(255, 255, 255, 0.8);
  position: sticky;
  ${flexbox({})}
  top: 0;
  left: 0;
  backdrop-filter: blur(2px) saturate(180%);

  &.header-at-top {
    height: 6.25rem;
  }
  z-index: 10;
`;

const HeaderContainer = styled.div`
  ${containerWidth()}
  ${flexbox({ justify: "space-between" })}
  padding: 0.5rem;

  .nav-container {
    width: 100%;
    ${flexbox({ justify: "space-around" })};
  }

  @media (max-width: 650px) {
    & .nav-container {
      display: none;
    }
    > .mobile-menu {
      display: block;
    }
  }
`;

const Header = ({ navDatas }) => {
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const handlePageY = () => {
      window.scrollY !== 0 ? setIsAtTop(false) : setIsAtTop(true);
    };

    window.addEventListener("scroll", handlePageY);

    return () => {
      window.removeEventListener("scroll", handlePageY);
    };
  }, []);

  return (
    <HeaderStyled className={isAtTop ? "header-at-top" : ""}>
      <HeaderContainer>
        {Logo}
        <div className="nav-container">
          <Navbar navDatas={navDatas} />
          <Profile />
        </div>
        <MobileMenu />
      </HeaderContainer>
    </HeaderStyled>
  );
};

export default Header;
