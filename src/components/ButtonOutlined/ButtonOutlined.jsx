import styled from "styled-components";

/*
bgHoverColor => set the background color when hovered

-----------

color => set the current text color

-----------

colorHover => set the text color when hovered

-----------

borderColor => set the border color

-----------

borderHoverColor => set the border color when hovered
*/

const ButtonOutlined = styled.button`
  ${({ bgHoverColor, color, colorHover, borderColor, borderHoverColor }) => `
  --bg-hover-color:${bgHoverColor || "var(--white)"};
  --color:${color || "var(--black)"};
  --color-hover:${colorHover || "var(--black)"};
  --border-color:${borderColor || "var(--black)"};
  --border-hover-color:${borderHoverColor || "var(--black)"};
  `}

  transition: background .4s ease,color .4s ease,border-color .4s ease;
  width: ${(props) => props.width || "unset"};
  height: 3rem;
  position: relative;
  border-top: 2px solid var(--border-color);
  border-bottom: 2px solid var(--border-color);
  color: var(--color);
  cursor: pointer;
  padding: 0 20px;
  background: none;
  font-size: 18px;
  font-weight: 800;
  font-family: var(--primary-font);

  &::before,
  &::after {
    transition: height 0.2s ease, background 0.2s ease;
    content: "";
    width: 2px;
    height: 35%;
    position: absolute;
    background: var(--border-color);
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
    background: var(--bg-hover-color);
    border-top-color: var(--border-hover-color);
    border-bottom-color: var(--border-hover-color);
    color: var(--color-hover);
  }

  &:hover::before,
  &:hover::after {
    height: 105%;
    background: var(--border-hover-color);
  }

  ${(props) => props.cssStyle}
`;

const themes = {
  white: {
    bgHoverColor: "var(--black)",
    color: "var(--white)",
    colorHover: "var(--white)",
    borderColor: "var(--white)",
    borderHoverColor: "var(--white)",
  },
  reverseWhite: {
    bgHoverColor: "var(--white)",
    color: "var(--white)",
    colorHover: "var(--black)",
    borderColor: "var(--white)",
    borderHoverColor: "var(--black)",
  },
  reverseBlack: {
    bgHoverColor: "var(--black)",
    color: "var(--black)",
    colorHover: "var(--white)",
    borderColor: "var(--black)",
    borderHoverColor: "var(--white)",
  },
};

export { themes };
export default ButtonOutlined;
