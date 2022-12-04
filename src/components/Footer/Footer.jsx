import styled from "styled-components";
import { containerWidth } from "../../styles/extendableStyles/ExtendableStyles.styled";

const FooterStyled = styled.footer`
  width: 100%;
  height: 15rem;
  background-color: #fafafa;
  border-top: 1px solid #eaeaea;
`;

const FooterContainer = styled.div`
  ${containerWidth()}
  padding: 0.5rem;
  margin: auto;
`;

const Footer = () => {
  return (
    <FooterStyled>
      <FooterContainer>this is the footer</FooterContainer>
    </FooterStyled>
  );
};

export default Footer;
