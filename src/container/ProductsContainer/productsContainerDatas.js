import styled from "styled-components";
import { containerWidth } from "../../styles/extendableStyles/ExtendableStyles.styled";

const ItemsContainer = styled.div`
  ${containerWidth()}
  height:100%;
  margin: 20px auto 75px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(10rem, 285px));
  justify-content: center;
  gap: 20px;

  @media (max-width: 656px) {
    grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  }
`;

const FilterSection = styled.section`
  ${containerWidth()}
  display: flex;
  padding: 25px 0 0;
  flex-wrap: wrap;
  margin: auto;
`;

const selectDropdownStyles = {
  dropdownContainerStyle: `
border:1px solid var(--black);
margin: 0 10px 15px 0;
`,
  openerButtonStyle: `
padding:10px 12.5px;
`,
  dropdownMenuStyle: `
top: 47.5px;
left: -1px;
`,
  dropdownItemStyle: `
  position:relative;
  & svg{
    font-size:17.5px;
    position:absolute;
    top:50%;
    left:100%;
    transform:translate(-150%,-50%);
  }
`,
};

export { ItemsContainer, FilterSection, selectDropdownStyles };
