import { memo } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { toggleMobileMenu } from "../../redux/elements/elementSlice";
import { flexbox } from "../../styles/extendableStyles/ExtendableStyles.styled";
import { useLocation } from "react-router-dom";

const NavList = styled.ul`
  ${(props) =>
    flexbox(
      props.direction === "horizontal"
        ? {}
        : props.direction === "vertical" && {
            dir: "column",
            justify: "flex-start",
          }
    )}

  > li {
    margin: 0 10px;
    font-size: var(--menu-font-size);
    ${(props) =>
      props.direction === "vertical" &&
      `width: 90%;
    margin: 0;
    font-size:25px;
    &:not(:last-child){
      border-bottom: 2px solid var(--gray);
    }`}

    &:hover > * {
      color: var(--black);
    }

    > a {
      display: block;
      ${(props) =>
        props.direction === "vertical" && `padding: 20px 15px !important;`}

      &.link-active {
        color: var(--black);
      }
    }

    & > div > button,
    & > a {
      transition: var(--color-transition);
      color: var(--gray);
      padding: 10px ${(props) => (props.direction === "vertical" ? "0" : "")};
    }

    @media (max-width: 750px) {
      user-select: none;
      margin: 0;
    }
  }
`;

const Navbar = ({ navDatas, direction }) => {
  const dispatch = useDispatch();

  const handleCloseMenu = () => {
    direction === "vertical" && dispatch(toggleMobileMenu());
  };

  const location = useLocation();

  return (
    <nav style={{ width: "100%" }}>
      <NavList direction={direction}>
        {navDatas.map(({ id, to, text }) => (
          <li key={id} onClick={handleCloseMenu}>
            <NavLink
              to={location.search || to}
              className={(navProps) => (navProps.isActive ? "link-active" : "")}
              end
            >
              {text}
            </NavLink>
          </li>
        ))}
      </NavList>
    </nav>
  );
};

export default memo(Navbar);
