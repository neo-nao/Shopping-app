import { useEffect } from "react";
import { useDispatch } from "react-redux";

const availableFilters = [
  {
    id: 1,
    input: "category",
    values: ["athlete", "walking", "hiking", "dancing"],
  },
  {
    id: 2,
    input: "type",
    values: ["sneaker", "chuck taylor", "boots", "kids", "formal"],
  },
  {
    id: 3,
    input: "color",
    values: [
      "red",
      "orange",
      "yellow",
      "green",
      "blue",
      "purple",
      "brown",
      "black",
      "white",
    ],
  },
];

const useFilterItem = ({
  filteredProducts,
  actions: { filterProducts, clearFilter, resetFilter },
}) => {
  const dispatch = useDispatch();

  const searchParams = window.location.search.slice(1);

  const params = new URLSearchParams(searchParams);

  const paramsArr = [...params.entries()];

  const filterItem = (filterInput, filterValue) => {
    let isValidFilter = false;

    availableFilters.forEach((filter) => {
      if (
        filterInput.toLowerCase() === filter.input &&
        filter.values.includes(filterValue.toLowerCase())
      )
        isValidFilter = true;
    });

    isValidFilter &&
      dispatch(
        filterProducts({
          tagKey: filterInput,
          tagValue: filterValue,
        })
      );
  };

  const resetItemFilter = () => {
    dispatch(resetFilter());
  };

  useEffect(() => {
    paramsArr.length
      ? paramsArr.forEach((param) => {
          filterItem(param[0], param[1]);
        })
      : resetItemFilter();
  }, [searchParams]);
};

export { availableFilters };
export default useFilterItem;
