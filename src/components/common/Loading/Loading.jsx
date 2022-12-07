import styled from "styled-components";
import { flexbox } from "../../../styles/extendableStyles/ExtendableStyles.styled";

const LoadingContainer = styled.div`
  width: fit-content;
  min-width: 400px;
  height: fit-content;
  min-height: 200px;
  ${flexbox({ dir: "column", justify: "space-evenly" })}

  @media (max-width: 520px) {
    min-width: 80%;
  }
`;

const LoadingTitle = styled.h3`
  font-family: var(--primary-font);
  font-size: 22.5px;
`;

const LoadingSpinner = styled.span`
  display: inline-block;
  width: 48px;
  height: 48px;
  border: 5px solid black;
  border-radius: 50%;
  border-bottom-color: transparent;
  box-sizing: border-box;
  animation: rotate 1s linear infinite;

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Loading = (props) => {
  return (
    <LoadingContainer style={props.style}>
      <LoadingSpinner />
      <LoadingTitle>{props.title ?? "Loading..."}</LoadingTitle>
    </LoadingContainer>
  );
};

export default Loading;
