import styled from "styled-components";
import {
  containerWidth,
  flexbox,
} from "../../styles/extendableStyles/ExtendableStyles.styled";

const FooterStyled = styled.footer`
  width: 100%;
  height: 5rem;
  background-color: #fafafa;
  border-top: 1px solid #eaeaea;

  @media (max-width: 800px) {
    height: 15rem;
  }
`;

const FooterContainer = styled.div`
  --flex-dir: row;
  height: 100%;
  ${containerWidth()}
  ${flexbox({ dir: "var(--flex-dir)", justify: "space-between" })}
padding: 0.5rem;
  margin: auto;

  & ul {
    ${flexbox({ justify: "space-evenly" })}
    flex-wrap:wrap;

    & li a {
      color: #777;
      padding: 5px 7.5px;

      &:hover {
        color: var(--black);
      }
    }
  }

  & .social-medias-list {
    & > li a svg {
      transform: scale(1.6) translateY(1px);
    }
  }

  @media (max-width: 800px) {
    --flex-dir: column;
    padding: 1.5rem 0.5rem;

    & .social-medias-container {
      order: -1;
    }
  }
`;

const RightsText = styled.span`
  margin-left: 10px;
  font-size: 14px;
  color: var(--gray);
`;

const RedirectLinksContainer = styled.div`
  width: 27.5rem;
  font-size: 17.5px;

  @media (max-width: 800px) {
    width: 90%;

    & ul li {
      flex-basis: 50%;
      text-align: center;
      margin: 12.5px 0;
    }
  }
`;

const CompanyLogo = styled.div`
  ${flexbox({ justify: "space-between" })}

  @media (max-width:800px) {
    order: 2;
  }
`;

export {
  FooterStyled,
  FooterContainer,
  RightsText,
  RedirectLinksContainer,
  CompanyLogo,
};
