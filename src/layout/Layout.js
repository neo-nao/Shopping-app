import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import styled from "styled-components";
import SliderMenu from "../container/SliderMenu/SliderMenu";
import AlertBox from "../components/common/AlertBox/AlertBox";

const navDatas = [
  { id: 1, to: "/", text: "Home" },
  { id: 2, to: "/products", text: "Products" },
  { id: 3, to: "/special-offers", text: "Special Offers" },
  { id: 4, to: "/about-us", text: "About us" },
  { id: 5, to: "/anjam-midam", text: "Anjam midam" },
];

const Main = styled.main`
  --footer-height: 5rem;
  position: relative;
  min-height: calc(100vh - (6.25rem + var(--footer-height)));

  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background: red;
  }

  @media (max-width: 800px) {
    --footer-height: 15rem;
  }
`;

const Layout = ({ children }) => {
  return (
    <>
      <SliderMenu navDatas={navDatas} />
      <Header navDatas={navDatas} />
      <Main>{children}</Main>
      <Footer />
      <AlertBox />
    </>
  );
};

export default Layout;
