import styled from "styled-components";
import { flexbox } from "../../../styles/extendableStyles/ExtendableStyles.styled";

const MessageBoxContainer = styled.div`
  width: 90%;
  max-width: 400px;
  height: fit-content;
  min-height: 150px;

  ${flexbox({ dir: "column", justify: "space-evenly" })}
`;

const MessageBox = ({ icon, title, fontSize, iconSize }) => {
  return (
    <MessageBoxContainer>
      <span style={{ fontSize: iconSize ?? "60px", marginBottom: "25px" }}>
        {icon}
      </span>
      <h1
        style={{
          width: "100%",
          textAlign: "center",
          fontSize: fontSize ?? "22.5px",
        }}
      >
        {title}
      </h1>
    </MessageBoxContainer>
  );
};

export default MessageBox;
