import { memo, useRef, useState, useEffect } from "react";
import { Link } from "wouter";
import { MdKeyboardArrowDown } from "react-icons/md";
import {
  DropdownContainer,
  DropdownButton,
  DropdownMenu,
  DropdownList,
} from "./DropdownStyled";

const Dropdown = ({
  dropdownItemslist,
  handleDropdownItemClick,
  openerButtonText,
  dropdownContainerStyle,
  openerButtonStyle,
  dropdownMenuStyle,
  dropdownItemStyle,
  closeOnClick,
}) => {
  const [isDropdownOpened, setIsDropdownOpened] = useState(false);

  const dropdownRef = useRef();
  const dropdownButtonRef = useRef();

  const handleDropdownState = (method = null) => {
    setIsDropdownOpened(method ?? !isDropdownOpened);
  };

  const handleClick = (itemId) => {
    handleDropdownItemClick(itemId);
    closeOnClick && handleDropdownState(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !dropdownButtonRef.current.contains(event.target)
      ) {
        handleDropdownState(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [dropdownRef.current]);

  return (
    <DropdownContainer
      dropdownContainerStyle={dropdownContainerStyle}
      id="dropdown"
    >
      <DropdownButton
        onClick={() => handleDropdownState()}
        className={isDropdownOpened ? "dropdown-opened" : ""}
        ref={dropdownButtonRef}
        openerButtonStyle={openerButtonStyle}
      >
        <span>{openerButtonText}</span>
        <MdKeyboardArrowDown style={{ margin: "3px 0 0 10px" }} />
      </DropdownButton>
      <DropdownMenu
        ref={dropdownRef}
        className={isDropdownOpened ? "opened" : ""}
        dropdownMenuStyle={dropdownMenuStyle}
      >
        <DropdownList dropdownItemStyle={dropdownItemStyle}>
          {dropdownItemslist.map(({ id, to, text, isToggled }) => {
            return (
              <li key={id}>
                {to ? (
                  <Link
                    href={to}
                    onClick={() => closeOnClick && handleDropdownState(false)}
                  >
                    {text}
                  </Link>
                ) : (
                  <button
                    onClick={() => handleClick(id)}
                    style={{
                      background: isToggled ? "var(--black)" : "",
                      color: isToggled ? "var(--white)" : "",
                    }}
                  >
                    {text}
                  </button>
                )}
              </li>
            );
          })}
        </DropdownList>
      </DropdownMenu>
    </DropdownContainer>
  );
};

export default memo(Dropdown);
