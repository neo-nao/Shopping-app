import styled from "styled-components";

const DescriptionContainer = styled.div`
  width: clamp(160px, 100%, 375px);
  margin: auto;

  & > h3 {
    font-size: 20px;
    margin-bottom: 10px;
  }

  & > p {
    color: var(--gray);
    text-align: justify;
  }
`;

const ItemDescription = ({ children, style }) => {
  return (
    <DescriptionContainer style={style}>
      <h3>Description</h3>
      <p>{children}</p>
    </DescriptionContainer>
  );
};

export default ItemDescription;
