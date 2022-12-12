import styled from "styled-components";
import FullPageHeight from "../../components/common/FullPageHeight/FullPageHeight";
import { flexbox } from "../../styles/extendableStyles/ExtendableStyles.styled";

const AboutUsContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: 20rem;
  ${flexbox()};
`;

const AboutUsBox = styled.section`
  width: clamp(15rem, 90%, 40rem);
  height: clamp(17rem, 80%, 30rem);
  border: 2px solid var(--black);

  @media (max-width: 800px) {
    height: 90%;
    max-height: 40rem;
  }
`;

const renderPageElements = () => {
  return (
    <AboutUsContainer>
      <AboutUsBox></AboutUsBox>
    </AboutUsContainer>
  );
};

const AboutUsPage = () => {
  return (
    <>
      {window.innerWidth <= 800 ? (
        <FullPageHeight>{renderPageElements()}</FullPageHeight>
      ) : (
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
          }}
        >
          <AboutUsContainer>{renderPageElements()}</AboutUsContainer>
        </div>
      )}
    </>
  );
};

export default AboutUsPage;
