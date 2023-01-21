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

const initialState = [
  {
    id: 1,
    openerText: "Category",
    options: [
      { id: 1, text: "Unset", accessText: "Unset" },
      { id: 2, text: "Athlete", accessText: "Athlete" },
      { id: 3, text: "Walking", accessText: "Walking" },
      { id: 4, text: "Hiking", accessText: "Hiking" },
      { id: 5, text: "Dancing", accessText: "Dancing" },
    ],
  },
  {
    id: 2,
    openerText: "Type",
    options: [
      { id: 1, text: "Unset", accessText: "Unset" },
      { id: 2, text: "Sneaker", accessText: "Sneaker" },
      { id: 3, text: "Chuck taylor", accessText: "Chuck taylor" },
      { id: 4, text: "Boots", accessText: "Boots" },
      { id: 5, text: "Kids", accessText: "Kids" },
      { id: 6, text: "Formal", accessText: "Formal" },
    ],
    dropdownMenuStyle: `
${selectDropdownStyles.dropdownMenuStyle}
@media (max-width:355px) and (min-width:261px){
  left: calc(-100% - 20px);
}
`,
  },
  {
    id: 3,
    openerText: "Color",
    options: [
      { id: 1, text: "Unset", accessText: "Unset" },
      { id: 2, text: "Red", accessText: "Red" },
      { id: 3, text: "Orange", accessText: "Orange" },
      { id: 4, text: "Yellow", accessText: "Yellow" },
      { id: 5, text: "Green", accessText: "Green" },
      { id: 6, text: "Blue", accessText: "Blue" },
      { id: 7, text: "Purple", accessText: "Purple" },
      { id: 8, text: "Brown", accessText: "Brown" },
      { id: 9, text: "Black", accessText: "Black" },
      { id: 10, text: "White", accessText: "White" },
    ],
    dropdownMenuStyle: `
${selectDropdownStyles.dropdownMenuStyle}
@media (max-width:500px) and (min-width:378px){
  left: calc(-100% - 11px) !important;
}
@media (max-width:266px){
  left: 0;
}
`,
  },
];

export { ItemsContainer, FilterSection, selectDropdownStyles, initialState };
