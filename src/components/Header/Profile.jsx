import { memo, useState } from "react";
import { useDispatch } from "react-redux";
import { toggleMobileMenu } from "../../redux/elements/elementSlice";
import Dropdown from "../common/Dropdown/Dropdown";
import {
  MenuDropdownContainer,
  SliderMenuListItem,
  DropdownItemContainer,
} from "./ProfileStyled";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Link } from "react-router-dom";

const dropdownItemsData = [
  { id: 1, to: "/cart", text: "Cart" },
  { id: 2, to: "/manage-account", text: "Manage account" },
];

const MenuDropdownItem = () => {
  const [isMenuDropdownActive, setIsMenuDropdownActive] = useState(false);

  const clickHandler = () => {
    setIsMenuDropdownActive(!isMenuDropdownActive);
  };

  const dispatch = useDispatch();

  const handleMenuDisplay = () => {
    dispatch(toggleMobileMenu());
  };

  return (
    <MenuDropdownContainer>
      <SliderMenuListItem
        onClick={clickHandler}
        className={isMenuDropdownActive ? "menu-dropdown-active" : ""}
      >
        <span className="text">Profile</span>
        <span className="icon">
          <MdKeyboardArrowDown
            className={isMenuDropdownActive ? "rotate-arrow" : ""}
          />
        </span>
      </SliderMenuListItem>
      <DropdownItemContainer
        className={isMenuDropdownActive ? "" : "dropdown-item-container-closed"}
      >
        <ul>
          {dropdownItemsData.map(({ id, to, text }) => (
            <li key={id} onClick={handleMenuDisplay}>
              <SliderMenuListItem>
                <Link to={to} className="menu-dropdown-link">
                  {text}
                </Link>
              </SliderMenuListItem>
            </li>
          ))}
        </ul>
      </DropdownItemContainer>
    </MenuDropdownContainer>
  );
};

const Profile = () => {
  return (
    <>
      <Dropdown
        dropdownItemslist={dropdownItemsData}
        openerButtonText="Profile"
        dropdownContainerStyle={`
      @media (max-width:650px){
        display:none;
      }
      `}
        dropdownMenuStyle={`
        top:37.5px;
      left: -120px;
      `}
        closeOnClick
      />
      <MenuDropdownItem />
    </>
  );
};

export default memo(Profile);
