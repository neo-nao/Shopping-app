import { useMemo } from "react";
import Dropdown from "../../components/common/Dropdown/Dropdown";
import useTogglingDropdown, {
  resetDropdownAction,
  toggleDropdownAction,
} from "../../hooks/useTogglingDropdown";
import {
  selectDropdownStyles,
  filterDropdownDatas,
  getFilterValues,
} from "./productsContainerDatas";

const FilterDropdown = ({ filterParamDispatcher }) => {
  const [categoryTogglingDropdown, categoryDispatcher] = useTogglingDropdown(
    getFilterValues()[0]
  );
  const [typeTogglingDropdown, typeDispatcher] = useTogglingDropdown(
    getFilterValues()[1]
  );
  const [colorTogglingDropdown, colorDispatcher] = useTogglingDropdown(
    getFilterValues()[2]
  );

  const handleFilterSelect = (handlerKey, options, itemId) => {
    const selectedOption = options.find((option) => option.id === itemId);

    if (selectedOption.id !== 1) {
      switch (handlerKey.toLowerCase()) {
        case "category":
          categoryDispatcher(toggleDropdownAction(itemId));
          break;
        case "type":
          typeDispatcher(toggleDropdownAction(itemId));
          break;
        case "color":
          colorDispatcher(toggleDropdownAction(itemId));
          break;
        default:
      }

      filterParamDispatcher({
        type: "addFilter",
        payload: {
          filterInput: handlerKey.toLowerCase(),
          filterValue: selectedOption.text.toLowerCase(),
        },
      });
    } else {
      switch (handlerKey.toLowerCase()) {
        case "category":
          categoryDispatcher(resetDropdownAction());
          break;
        case "type":
          typeDispatcher(resetDropdownAction());
          break;
        case "color":
          colorDispatcher(resetDropdownAction());
          break;
        default:
      }

      filterParamDispatcher({
        type: "resetFilter",
        payload: { filterInput: handlerKey },
      });
    }
  };

  const categoryFilterDropdown = useMemo(() => {
    const index = 0;
    const { id, openerText } = filterDropdownDatas[index];
    return (
      <Dropdown
        key={id}
        dropdownItemslist={categoryTogglingDropdown}
        openerButtonText={openerText}
        handleDropdownItemClick={(itemId) =>
          handleFilterSelect(openerText, categoryTogglingDropdown, itemId)
        }
        {...selectDropdownStyles}
      />
    );
  }, [categoryTogglingDropdown]);
  const typeFilterDropdown = useMemo(() => {
    const index = 1;
    const { id, openerText } = filterDropdownDatas[index];
    return (
      <Dropdown
        key={id}
        dropdownItemslist={typeTogglingDropdown}
        openerButtonText={openerText}
        handleDropdownItemClick={(itemId) =>
          handleFilterSelect(openerText, typeTogglingDropdown, itemId)
        }
        {...selectDropdownStyles}
      />
    );
  }, [typeTogglingDropdown]);
  const colorFilterDropdown = useMemo(() => {
    const index = 2;
    const { id, openerText } = filterDropdownDatas[index];
    return (
      <Dropdown
        key={id}
        dropdownItemslist={colorTogglingDropdown}
        openerButtonText={openerText}
        handleDropdownItemClick={(itemId) =>
          handleFilterSelect(openerText, colorTogglingDropdown, itemId)
        }
        {...selectDropdownStyles}
      />
    );
  }, [colorTogglingDropdown]);

  return [categoryFilterDropdown, typeFilterDropdown, colorFilterDropdown];
};

export default FilterDropdown;
