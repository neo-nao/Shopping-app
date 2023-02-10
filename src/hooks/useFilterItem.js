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

const useFilterItem = (
  filterParams,
  { fetchItems, pageFilter: { filterProducts } }
) => {
  const dispatch = useDispatch();

  const filterItem = (filterInput, filterValue) => {
    let isValidFilter = false;

    availableFilters.forEach((filter) => {
      if (
        filterInput.toLowerCase() === filter.input &&
        filter.values.includes(filterValue.toLowerCase())
      )
        isValidFilter = true;
    });

    if (isValidFilter) {
      let reqUrl = "?";

      const filterUrl = filterParams
        .map(
          (fp) =>
            `${fp[0] === "color" ? "colors" : fp[0]}=${fp[1].replaceAll(
              /\s/g,
              "+"
            )}`
        )
        .join("&");

      reqUrl += filterUrl;

      dispatch(
        filterProducts({
          tagKey: filterInput,
          tagValue: filterValue,
        })
      );
      dispatch(fetchItems(reqUrl));
    }
  };

  useEffect(() => {
    let isMounted = true;
    if (!filterParams) return;

    if (filterParams.length) {
      filterParams.forEach((param) => {
        isMounted && filterItem(param[0], param[1]);
      });
    } else {
      isMounted && dispatch(fetchItems());
    }

    return () => (isMounted = false);
  }, [filterParams]);
};

export { availableFilters };
export default useFilterItem;
