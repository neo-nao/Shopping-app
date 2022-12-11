import { Link } from "react-router-dom";
import {
  FooterStyled,
  FooterContainer,
  RightsText,
  RedirectLinksContainer,
  CompanyLogo,
} from "../../styles/Elements/FooterElements";
import Logo from "../common/Logo/Logo";
import { FaInstagram, FaGithub, FaFacebook, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <FooterStyled>
      <FooterContainer>
        <CompanyLogo>
          {Logo}
          <RightsText>&copy; 2022 Next, inc.</RightsText>
        </CompanyLogo>
        <RedirectLinksContainer>
          <nav>
            <ul className="redirect-list">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/products">Products</Link>
              </li>
              <li>
                <Link to="/special-offers">Special offers</Link>
              </li>
              <li>
                <Link to="/about-us">About us</Link>
              </li>
            </ul>
          </nav>
        </RedirectLinksContainer>
        <div className="social-medias-container" style={{ width: "15rem" }}>
          <nav>
            <ul className="social-medias-list">
              <li>
                <a
                  href="https://instagram.com/lucy_.chann"
                  rel="noreferrer noopener"
                  target="_blank"
                >
                  <FaInstagram />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/lucy-chann"
                  rel="noreferrer noopener"
                  target="_blank"
                >
                  <FaGithub />
                </a>
              </li>
              <li>
                <a
                  href="https://facebook.com"
                  rel="noreferrer noopener"
                  target="_blank"
                >
                  <FaFacebook />
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com/Raiiden_shogunn"
                  rel="noreferrer noopener"
                  target="_blank"
                >
                  <FaTwitter />
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </FooterContainer>
    </FooterStyled>
  );
};

export default Footer;
