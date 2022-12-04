import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import styled from "styled-components";
import SliderMenu from "../container/SliderMenu/SliderMenu";
import AlertBox from "../components/common/alertBox/AlertBox";

const navDatas = [
  { id: 1, to: "/", text: "Home" },
  { id: 2, to: "/products", text: "Products" },
  { id: 3, to: "/special-offers", text: "Special Offers" },
  { id: 4, to: "/about-us", text: "About us" },
];

const Main = styled.main`
  position: relative;
  min-height: calc(100vh - 21.25rem);
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
