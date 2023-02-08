import { useReducer } from "react";

function togglingDropdownReducer(state, action) {
  const stateCopy = [...state];
  switch (action.type) {
    case "toggle": {
      const selectedOption = stateCopy.find(
        (option) => option.id === action.payload.optionId
      );
      if (!selectedOption.isToggled) selectedOption.isToggled = true;
      else selectedOption.isToggled = false;

      return stateCopy;
    }

    case "activate": {
      const selectedOption = stateCopy.find(
        (option) => option.id === action.payload.optionId
      );

      console.log(selectedOption);
      selectedOption.isToggled = true;

      return stateCopy;
    }

    case "inactivate": {
      const selectedOption = stateCopy.find(
        (option) => option.id === action.payload.optionId
      );
      selectedOption.isToggled = false;

      return stateCopy;
    }

    case "reset":
      return stateCopy.map((option) => ({ id: option.id, text: option.text }));

    default:
      console.error("Toggle command is not valid");
  }
}

const toggleDropdownAction = (optionId) => ({
  type: "toggle",
  payload: { optionId },
});
const activateDropdownAction = (optionId) => ({
  type: "activate",
  payload: { optionId },
});
const inactivateDropdownAction = (optionId) => ({
  type: "inactivate",
  payload: { optionId },
});
const resetDropdownAction = () => ({ type: "reset" });

const useTogglingDropdown = (initialState) => {
  const [togglingDropdown, dropdownDispatcher] = useReducer(
    togglingDropdownReducer,
    initialState ?? []
  );

  return [togglingDropdown, dropdownDispatcher];
};

export {
  toggleDropdownAction,
  activateDropdownAction,
  inactivateDropdownAction,
  resetDropdownAction,
};
export default useTogglingDropdown;
