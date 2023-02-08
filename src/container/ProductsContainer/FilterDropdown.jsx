import { useEffect, useMemo } from "react";
import Dropdown from "../../components/common/Dropdown/Dropdown";
import useTogglingDropdown, {
  activateDropdownAction,
  resetDropdownAction,
  toggleDropdownAction,
} from "../../hooks/useTogglingDropdown";
import {
  selectDropdownStyles,
  filterDropdownDatas,
  getFilterValues,
} from "./productsContainerDatas";

const FilterDropdown = ({
  filterParams: { filterParams, filterParamsDispatcher },
}) => {
  const [categoryTogglingDropdown, categoryDispatcher] = useTogglingDropdown(
    getFilterValues(filterParams)[0]
  );
  const [typeTogglingDropdown, typeDispatcher] = useTogglingDropdown(
    getFilterValues(filterParams)[1]
  );
  const [colorTogglingDropdown, colorDispatcher] = useTogglingDropdown(
    getFilterValues(filterParams)[2]
  );

  const handleFilterDropdown = () => {
    if (!filterParams) return;

    for (const filter of filterParams) {
      switch (filter[0]) {
        case "category": {
          categoryTogglingDropdown.forEach((cf) => {
            if (filter[1] === cf.text.toLowerCase()) {
              categoryDispatcher(activateDropdownAction(cf.id));
            }
          });
          break;
        }
        case "type": {
          typeTogglingDropdown.forEach((tf) => {
            if (filter[1] === tf.text.toLowerCase()) {
              typeDispatcher(activateDropdownAction(tf.id));
            }
          });
          break;
        }
        case "color": {
          colorTogglingDropdown.forEach((cf) => {
            if (filter[1] === cf.text.toLowerCase()) {
              colorDispatcher(activateDropdownAction(cf.id));
            }
          });
          break;
        }
        default:
      }
    }
  };

  useEffect(() => {
    handleFilterDropdown();
  }, [filterParams]);

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

      filterParamsDispatcher({
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

      filterParamsDispatcher({
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
