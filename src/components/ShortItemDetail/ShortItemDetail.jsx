import { memo } from "react";
import styled from "styled-components";
import { flexbox } from "../../styles/extendableStyles/ExtendableStyles.styled";
import { IoCloseSharp } from "react-icons/io5";

const responsiveItemDetail = (el) => {
  const cssProps = el === "item" ? "padding: 0 12.5px;" : "margin: 0;";

  return `
  @media (max-width:980px) and (min-width:780px){
    ${cssProps}
  }
    
  @media (max-width:330px){
    ${cssProps}
  }
    `;
};

const ShortItemOverview = styled.li`
  transition: background 0.4s ease;
  width: 100%;
  height: 4rem;
  position: relative;
  margin-bottom: 10px;
  border-top: 2px solid var(--black);
  border-bottom: 2px solid var(--black);
  cursor: pointer;
  ${flexbox({ justify: "space-between" })}
  padding: 0 20px;

  &::before,
  &::after {
    transition: height 0.2s ease;
    content: "";
    width: 2px;
    height: 35%;
    position: absolute;
    background: var(--black);
  }

  &::before {
    left: 0;
    bottom: -1px;
  }
  &::after {
    right: 0;
    top: -1px;
  }

  &:hover {
    background: #e9e9e9;
  }

  &:hover::before,
  &:hover::after {
    height: 105%;
  }

  ${responsiveItemDetail("item")}
`;

const ShoeTitle = styled.span`
  transition: var(--color-transition);
  font-size: 18px;
  font-weight: bold;
  color: #515151;
  text-transform: capitalize;

  ${ShortItemOverview}:hover & {
    color: var(--black);
  }

  & .times-icon {
    position: relative;
    top: 3px;
    margin: 0 2.5px;

    ${responsiveItemDetail("icon")}
  }
`;

let isItemToggled = false;

const ShortItemDetail = ({ product, quantity }) => {
  const handleItemDetailClick = () => {
    if (!isItemToggled) {
      const element = document.querySelector(".user-item-" + product.id);

      const y = element.getBoundingClientRect().top + window.scrollY;

      window.scroll({
        top: y - window.innerHeight / 2,
      });

      element.classList.add("item-press-active");

      isItemToggled = true;

      setTimeout(() => {
        element.classList.remove("item-press-active");
        isItemToggled = false;
      }, 1300);
    }
  };

  return (
    <ShortItemOverview onClick={handleItemDetailClick}>
      <ShoeTitle>{product.shoe || product.type}</ShoeTitle>
      <ShoeTitle>
        {product.offPrice ?? product.price} $
        <IoCloseSharp className="times-icon" /> {quantity}
      </ShoeTitle>
    </ShortItemOverview>
  );
};

export default memo(ShortItemDetail);
