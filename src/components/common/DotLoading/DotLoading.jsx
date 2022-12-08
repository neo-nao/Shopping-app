import styled from "styled-components";
import { flexbox } from "../../../styles/extendableStyles/ExtendableStyles.styled";

const LoadingContainer = styled.div`
  height: 25px;
  width: 40px;
  ${flexbox({ justify: "space-between" })}

  & > span {
    display: inline-block;
  }

  & :nth-child(2) {
    animation-delay: 0.25s;
  }

  & :last-child {
    animation-delay: 0.5s;
  }
`;

const Dot = styled.span`
  width: 8px;
  height: 8px;
  background: #393939;
  border-radius: 50%;
  animation: adjustScale 0.5s linear infinite alternate;

  @keyframes adjustScale {
    from {
      transform: scale(1);
    }
    to {
      transform: scale(1.5);
    }
  }
`;

const DotLoading = () => {
  return (
    <LoadingContainer>
      <Dot />
      <Dot />
      <Dot />
    </LoadingContainer>
  );
};

export default DotLoading;
