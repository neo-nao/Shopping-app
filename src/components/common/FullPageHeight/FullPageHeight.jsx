import styled from "styled-components";
import { flexbox } from "../../../styles/extendableStyles/ExtendableStyles.styled";

const Container = styled.section`
  width: 100%;
  height: calc(100vh - 6.25rem);
`;

const InnerElementContainer = styled.div`
  width: 100%;
  height: 100%;

  ${(props) => props.centerElements && flexbox()}
`;

const FullPageHeight = ({ children, centerElements, style }) => {
  return (
    <Container>
      <InnerElementContainer centerElements={centerElements} style={style}>
        {children}
      </InnerElementContainer>
    </Container>
  );
};

export default FullPageHeight;
