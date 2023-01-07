import styled from "styled-components";
import { placeCenter } from "../../styles/extendableStyles/ExtendableStyles.styled";

const PatternContainer = styled.div`
  position: absolute;
  min-width: 126px;
  user-select: none;

  ${(props) => props.cssStyle || ""}
`;

const Plus = styled.div`
  width: 10px;
  height: 10px;
  margin: 2px 4px;
  display: inline-block;
  position: relative;

  &::before,
  &::after {
    content: "";
    position: absolute;
    ${placeCenter()}
    background:var(--black);
    width: 0.5px;
  }

  &::before {
    height: 130%;
  }

  &::after {
    width: 130%;
    height: 0.5px;
  }
`;

const renderPattern = () => {
  const plusComps = [];

  let i = 0;
  const maxLength = 49;
  while (i < maxLength) {
    const breakPoint = maxLength / 7;
    plusComps[i] = (
      <>
        <Plus key={i} />
        {(i + 1) % breakPoint === 0 && <br />}
      </>
    );
    i++;
  }

  return plusComps;
};

const PlusPattern = (props) => {
  return (
    <PatternContainer cssStyle={props.cssStyle}>
      {renderPattern()}
    </PatternContainer>
  );
};

export default PlusPattern;
