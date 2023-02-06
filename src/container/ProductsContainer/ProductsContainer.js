import { useEffect, memo, useMemo, lazy, Suspense, useReducer } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "wouter";
import { ItemsContainer, FilterSection } from "./productsContainerDatas";
import Loading from "../../components/common/Loading/Loading";
import FullPageHeight from "../../components/common/FullPageHeight/FullPageHeight";
import MessageBox from "../../components/common/MessageBox/MessageBox";
import { CgUnavailable } from "react-icons/cg";
import useFilterItem from "../../hooks/useFilterItem";
import FilterDropdown from "./FilterDropdown";

const Product = lazy(() => import("../../components/common/Product/Product"));

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
      const filteredState = state.filter(
        (f) => f[0] !== action.payload.filterInput.toLowerCase()
      );

      return filteredState;
    }
    default:
      return state;
  }
};

const ProductsContainer = ({
  productsFetchState: { loading, error, products },
  getAsyncProducts,
  filter,
}) => {
  const [filterParams, filterParamDispatcher] = useReducer(
    filterParamsReducer,
    []
  );
  useFilterItem(filter);
  const dispatch = useDispatch();
  const [location, navigate] = useLocation();

  useEffect(() => {
    const searchParameter =
      filterParams.length > 0
        ? "?" + filterParams.map((fp) => fp.join("=")).join("&")
        : location;

    navigate(searchParameter);
  }, [filterParams]);

  useEffect(() => {
    dispatch(getAsyncProducts());
  }, []);

  const renderProducts = () => {
    const productsArr = [];
    let i = 0;
    for (; i < products.length; i++) {
      productsArr.push(<Product key={products[i].id} {...products[i]} />);

      if (i === products.length - 1) return productsArr;
    }
  };

  console.log(loading, error, products);

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
          {!loading && !error && products && (
            <FilterSection>
              <FilterDropdown filterParamDispatcher={filterParamDispatcher} />
            </FilterSection>
          )}
          {renderItems}
        </Suspense>
      </section>
    </>
  );
};

export default memo(ProductsContainer);
