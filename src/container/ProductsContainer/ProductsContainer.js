import { useEffect, memo, useMemo, lazy, Suspense, useReducer } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "wouter";
import Dropdown from "../../components/common/Dropdown/Dropdown";
import {
  ItemsContainer,
  FilterSection,
  selectDropdownStyles,
  filterDropdownDatas,
} from "./productsContainerDatas";
import Loading from "../../components/common/Loading/Loading";
import FullPageHeight from "../../components/common/FullPageHeight/FullPageHeight";
import MessageBox from "../../components/common/MessageBox/MessageBox";
import { CgUnavailable } from "react-icons/cg";
import useFilterItem, { availableFilters } from "../../hooks/useFilterItem";

const Product = lazy(() => import("../../components/common/Product/Product"));

const initialFilterParams = [];

const filterParamsReducer = (state, action) => {
  switch (action.type) {
    case "addFilter": {
      const filterInput = action.payload.filterInput;
      const filterValue = action.payload.filterValue;

      let isFilterAdded = { isAdded: false, index: null };

      for (let i = 0; i < state.length; i++) {
        if (state[i][0] === filterInput && state[i][1] === filterValue)
          isFilterAdded = { isAdded: true, index: i };
      }

      if (isFilterAdded.isAdded)
        return state.filter((filter, idx) => idx !== isFilterAdded.index);

      return [...state, [filterInput, filterValue]];
    }
    case "resetFilter": {
      return [];
    }
    default:
      return state;
  }
};

const ProductsContainer = ({
  productsFetchState: { loading, error, products },
  filter,
}) => {
  const [filterParams, filterParamDispatcher] = useReducer(
    filterParamsReducer,
    initialFilterParams
  );
  useFilterItem(filter);
  const dispatch = useDispatch();
  const [, navigate] = useLocation();

  useEffect(() => {
    const searchParameter = filterParams.length
      ? "?" + filterParams.map((fp) => fp.join("=")).join("&")
      : "";

    navigate(searchParameter);
  }, [filterParams]);

  const handleFilterSelect = (handlerKey, options, itemId) => {
    const selectedOption = options.find((option) => option.id === itemId);

    if (selectedOption.accessText !== "Unset") {
      filterParamDispatcher({
        type: "addFilter",
        payload: {
          filterInput: handlerKey.toLowerCase(),
          filterValue: selectedOption.accessText.toLowerCase(),
        },
      });
    } else {
      filterParamDispatcher({
        type: "resetFilter",
      });
    }
  };

  const renderProducts = () => {
    const productsArr = [];
    let i = 0;
    for (; i < products.length; i++) {
      productsArr.push(<Product key={products[i].id} {...products[i]} />);

      if (i === products.length - 1) return productsArr;
    }
  };

  const renderItems = useMemo(() => {
    if (loading)
      return (
        <FullPageHeight centerElements>
          <Loading title="Fetching Products..." />
        </FullPageHeight>
      );
    if (error)
      return (
        <FullPageHeight centerElements>
          <h1>{error}</h1>
        </FullPageHeight>
      );

    if (products) {
      if (products.length)
        return <ItemsContainer>{renderProducts()}</ItemsContainer>;
      else
        return (
          <FullPageHeight centerElements>
            <MessageBox
              icon={<CgUnavailable />}
              title="Nothing found here"
            ></MessageBox>
          </FullPageHeight>
        );
    }
  }, [loading]);

  return (
    <>
      <section>
        <Suspense
          fallback={
            <FullPageHeight centerElements>
              <Loading title="Loading Products..." />
            </FullPageHeight>
          }
        >
          {/* {!loading && !error && products && ( */}
          <FilterSection>
            {filterDropdownDatas.map(
              ({ id, openerText, dropdownMenuStyle }) => {
                return (
                  <Dropdown
                    key={id}
                    dropdownItemslist={availableFilters}
                    openerButtonText={openerText}
                    {...selectDropdownStyles}
                  />
                );
              }
            )}
          </FilterSection>
          {/* )} */}
          {renderItems}
        </Suspense>
      </section>
    </>
  );
};

export default memo(ProductsContainer);
