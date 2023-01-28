import styled from "styled-components";

const Color = styled.div`
  display: inline-block;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  box-shadow: 0 0 0 ${(props) => (props.active ? "2px" : "0")} var(--black);
  background-color: ${(props) => props.color};
  position: relative;
  overflow: hidden;
  cursor: pointer;

  &:not(:last-child) {
    margin-right: 7.5px;
  }

  &::before {
    content: "";
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to right bottom,
      transparent 10%,
      rgba(255, 255, 255, 0.75) 180%
    );
    z-index: 1;
    position: absolute;
    pointer-events: none;
  }
`;

const ItemColors = ({ colors, handleColorClick }) => {
  return (
    <div
      style={{
        display: "inline-flex",
      }}
    >
      {colors.map(({ id, color, active }) => (
        <Color
          key={id}
          color={color}
          active={active}
          onClick={handleColorClick ? () => handleColorClick(id) : null}
        />
      ))}
    </div>
  );
};

export default ItemColors;
