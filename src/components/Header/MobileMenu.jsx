import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { RiMenu3Line } from "react-icons/ri";
import { AiOutlineClose } from "react-icons/ai";
import { toggleMobileMenu } from "../../redux/elements/elementSlice";

const MenuButton = styled.button`
  transition: transform 0.1s ease;
  width: 60px;
  height: 60px;
  background-color: unset;
  cursor: pointer;
  display: none;

  .hamburger-icon {
    width: 75%;
    height: 75%;
  }

  :active {
    transform: scale(0.85);
  }
`;

const MobileMenu = () => {
  const isMenuOpened = useSelector(
    (state) => state.elements.isMobileMenuOpened
  );

  const dispatch = useDispatch();

  return (
    <>
      <MenuButton
        className="mobile-menu"
        onClick={() => dispatch(toggleMobileMenu())}
      >
        {!isMenuOpened ? (
          <RiMenu3Line className="hamburger-icon" />
        ) : (
          <AiOutlineClose className="hamburger-icon" />
        )}
      </MenuButton>
    </>
  );
};

export default MobileMenu;
