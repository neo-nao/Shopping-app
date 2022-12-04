import styled from "styled-components";
import { flexbox } from "../../../styles/extendableStyles/ExtendableStyles.styled";

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
  ${(props) => props.dropdownContainerStyle};
`;

const DropdownButton = styled.button`
  background-color: unset;
  font-size: ${(props) => props.fontSize ?? "var(--menu-font-size)"};
  font-family: var(--main-font-family);
  ${flexbox()}
  cursor: pointer;
  z-index: 100;

  > svg {
    transition: transform 0.25s ease;
  }

  &.dropdown-opened {
    color: var(--black);

    > svg {
      transform: rotate(180deg);
    }
  }

  ${(props) => props.openerButtonStyle}
`;

const DropdownMenu = styled.div`
  transition: all 0.1s ease;
  width: 200px;
  padding: 5px;
  position: absolute;
  top: 30px;
  background-color: var(--white);
  border: 1px solid var(--black);
  opacity: 0;
  visibility: hidden;
  overflow: hidden;
  z-index: 100;

  &.opened {
    visibility: visible;
    opacity: 1;
  }

  ${(props) => props.dropdownMenuStyle}
`;

const DropdownList = styled.ul`
  > li {
    :not(:last-child) {
      border-bottom: 1px solid var(--gray);
    }
    overflow: hidden;

    > a,
    > button {
      width: 100%;
      display: block;
      padding: 10px;
      cursor: pointer;
      font-size: 15px;
      background-color: unset;
      color: var(--black);
      text-align: center;

      &:hover {
        background-color: #e1e1e1;
      }
    }

    ${(props) => props.dropdownItemStyle}
  }
`;

export { DropdownContainer, DropdownButton, DropdownMenu, DropdownList };
