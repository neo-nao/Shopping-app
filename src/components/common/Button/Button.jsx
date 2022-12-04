import styled from "styled-components";
import {
  boxshadow,
  flexbox,
} from "../../../styles/extendableStyles/ExtendableStyles.styled";

const ButtonStyled = styled.button`
  padding: 5px 5px;
  font-size: 15px;
  font-weight: 600;
  font-family: var(--primary-font);
  border: 2px solid var(--black);
  color: var(--black);
  background-color: var(--white);
  cursor: pointer;
  ${flexbox()}
  ${boxshadow()}

  &.active {
    transition: all 0.3s ease, var(--boxshadow-transition);
    background-color: var(--black);
    border-color: var(--white);
    color: var(--white);
  }
`;

const Button = ({ children, active, ...rest }) => {
  return (
    <ButtonStyled {...rest} className={active ? "active" : ""}>
      {children}
    </ButtonStyled>
  );
};

export default Button;
