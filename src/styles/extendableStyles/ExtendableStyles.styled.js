const flexbox = (flexObj) => {
  const { dir = "row", justify = "center", align = "center" } = flexObj ?? {};

  return `
    display:flex;
    flex-direction:${dir};
    justify-content:${justify};
    align-items:${align};
    `;
};

const containerWidth = (size) => {
  return `width: clamp(200px,${size ?? "90%"},var(--max-width));`;
};

const boxshadow = (eventType = "hover") => {
  return `
  transition:var(--boxshadow-transition);

  &:${eventType}{
    box-shadow: -3px 3px var(--black);
  }
  `;
};

const placeCenter = () => {
  return `
  top:50%;
  left:50%;
  transform: var(--placecenter-transform);
  `;
};

export { flexbox, containerWidth, boxshadow, placeCenter };
