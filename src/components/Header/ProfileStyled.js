import styled from "styled-components";
import { flexbox } from "../../styles/extendableStyles/ExtendableStyles.styled";

const MenuDropdownContainer = styled.div`
  width: 100%;
  position: relative;

  @media (min-width: 650px) {
    display: none;
  }
`;

const SliderMenuListItem = styled.div`
  width: 90%;
  border-bottom: 2px solid var(--gray);
  cursor: pointer;
  ${flexbox({ justify: "space-between" })}
  margin: auto;
  user-select: none;

  .text,
  .icon,
  .menu-dropdown-link {
    transition: var(--color-transition);
    font-size: 25px;
    color: var(--gray);
  }

  &:hover .text,
  &:hover .icon,
  .menu-dropdown-link:hover {
    color: var(--black);
  }

  .icon {
    transition: transform 1.25s ease;
    transform: translateY(3px);

    & .rotate-arrow {
      transform: rotate(180deg);
    }
  }

  .text,
  .menu-dropdown-link {
    padding: 20px 15px;
  }

  .menu-dropdown-link {
    display: block;
    width: 100%;
    height: 100%;
    margin-left: 20px;
  }

  &.menu-dropdown-active .text,
  &.menu-dropdown-active .icon {
    color: var(--black);
  }
`;

const DropdownItemContainer = styled.div`
  transition: height 0.4s ease;
  width: 100%;
  height: 145px;
  margin: auto;
  overflow: hidden;

  &.dropdown-item-container-closed {
    height: 0;
  }
`;

export { MenuDropdownContainer, SliderMenuListItem, DropdownItemContainer };
