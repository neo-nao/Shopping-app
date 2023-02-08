import {
  useEffect,
  memo,
  useMemo,
  lazy,
  Suspense,
  useReducer,
  useLayoutEffect,
} from "react";
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
    case "loadFilter": {
      const filterParams = [];

      const searchParams = window.location.search;

      const params = new URLSearchParams(searchParams);

      for (const p of params) {
        const isAdded = filterParams.some(
          (fp) =>
            fp[0].toLowerCase() === p[0].toLowerCase() &&
            fp[1].toLowerCase() === p[1].toLocaleLowerCase()
        );

        !isAdded && filterParams.push(p);
      }

      return filterParams;
    }
    case "addFilter": {
      const filterInput = action.payload.filterInput;
      const filterValue = action.payload.filterValue;

      let isFilterAdded = { isAdded: false, index: null };

      const newFilter = [filterInput, filterValue];

      if (state) {
        for (let i = 0; i < state.length; i++) {
          if (state[i][0] === filterInput && state[i][1] === filterValue)
            isFilterAdded = { isAdded: true, index: i };
        }

        if (isFilterAdded.isAdded)
          return state.filter((filter, idx) => idx !== isFilterAdded.index);

        return [...state, newFilter];
      } else {
        return [newFilter];
      }
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
  const [filterParams, filterParamsDispatcher] = useReducer(
    filterParamsReducer,
    null
  );
  useFilterItem(filterParams, {
    fetchItems: getAsyncProducts,
    pageFilter: filter.actions,
  });
  const [location, navigate] = useLocation();

  useEffect(() => {
    if (!filterParams) return;

    const searchParameter =
      filterParams.length > 0
        ? "?" + filterParams.map((fp) => fp.join("=")).join("&")
        : location;

    navigate(searchParameter);
  }, [filterParams]);

  useLayoutEffect(() => {
    filterParamsDispatcher({ type: "loadFilter" });
  }, []);

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
          {!loading && !error && products && (
            <FilterSection>
              <FilterDropdown
                filterParams={{ filterParams, filterParamsDispatcher }}
              />
            </FilterSection>
          )}
          {renderItems}
        </Suspense>
      </section>
    </>
  );
};

export default memo(ProductsContainer);
