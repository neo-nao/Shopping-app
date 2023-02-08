import styled from "styled-components";
import { availableFilters } from "../../hooks/useFilterItem";
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
  
  & button{
    text-transform:capitalize;
  }
`,
};

const filterDropdownDatas = [
  {
    id: 1,
    openerText: "Category",
  },
  {
    id: 2,
    openerText: "Type",
  },
  {
    id: 3,
    openerText: "Color",
  },
];

const getFilterValues = (activeFilters) => {
  let filterValues = [];

  for (const filter of availableFilters) {
    let generatedFilterValues = filter.values.map((filterValue, index) => {
      return {
        id: index + 2,
        text: filterValue,
      };
    });

    generatedFilterValues.unshift({ id: 1, text: "unset" });

    filterValues.push(generatedFilterValues);
  }

  return filterValues;
};

export {
  ItemsContainer,
  FilterSection,
  selectDropdownStyles,
  filterDropdownDatas,
  getFilterValues,
};
