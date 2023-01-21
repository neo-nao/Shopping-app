import { useState, useEffect, memo, useMemo, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  filterProducts,
  clearFilter,
  resetFilter,
} from "../../redux/prodcuts/productsSlice";
import Dropdown from "../../components/common/Dropdown/Dropdown";
import {
  ItemsContainer,
  FilterSection,
  selectDropdownStyles,
  initialState,
} from "./productsContainerDatas";
import { MdOutlineDone } from "react-icons/md";
import Loading from "../../components/common/Loading/Loading";
import FullPageHeight from "../../components/common/FullPageHeight/FullPageHeight";
import MessageBox from "../../components/common/MessageBox/MessageBox";
import { CgUnavailable } from "react-icons/cg";

const Product = lazy(() => import("../../components/common/Product/Product"));

const ProductsContainer = ({
  productsFetchState: { loading, error, products },
  getAsyncProducts,
}) => {
  const [dynamicURL, setDynamicURL] = useState(null);

  const [currentOption, setCurrentOption] = useState(null);

  const filteredProducts = useSelector(
    (state) => state.products.filteredOptions
  );

  const [filterOptionsData, setFilterOptionsData] = useState(initialState);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useMemo(() => {
    if (currentOption) {
      const optionSelectedFilters = filteredProducts[currentOption];

      const filterDataCopy = [...filterOptionsData];

      const currentFilterInputIndex = filterDataCopy.findIndex(
        (filterData) => filterData.openerText.toLowerCase() === currentOption
      );

      const currentFilterInput = filterDataCopy[currentFilterInputIndex];

      const filteredOptions = currentFilterInput.options.filter((option) =>
        optionSelectedFilters.includes(option.accessText)
      );

      currentFilterInput.options.forEach((option) => {
        option.text = option.accessText;
      });

      filteredOptions.forEach(
        (option) =>
          (option.text = (
            <>
              {option.text}
              <MdOutlineDone />
            </>
          ))
      );

      filterDataCopy[currentFilterInputIndex] = currentFilterInput;

      let fullURL = "";

      const handleIt = (key, filterValue) => {
        const url = new URLSearchParams({
          [key]: filterValue.toLowerCase(),
        }).toString();

        fullURL += (!fullURL ? "?" : "&") + url;
      };

      for (const key in filteredProducts) {
        filteredProducts[key].forEach((filterValue) =>
          handleIt(key, filterValue)
        );
      }

      setDynamicURL(fullURL);

      setFilterOptionsData(filterDataCopy);
    }
  }, [filteredProducts]);

  useEffect(() => {
    navigate(dynamicURL);
    dynamicURL !== null && dispatch(getAsyncProducts(dynamicURL));
  }, [dynamicURL]);

  useEffect(() => {
    if (products) {
      !products.length && dispatch(getAsyncProducts(dynamicURL));
    } else {
      dispatch(getAsyncProducts(dynamicURL));
    }

    return () => {
      dispatch(resetFilter());
    };
  }, []);

  const handleFilterSelect = (handlerKey, options, itemId) => {
    const selectedOption = options.find((option) => option.id === itemId);

    setCurrentOption(handlerKey);
    if (selectedOption.accessText !== "Unset") {
      dispatch(
        filterProducts({
          tagKey: handlerKey,
          tagValue: selectedOption.accessText,
        })
      );
    } else {
      if (filteredProducts[handlerKey].length) {
        dispatch(clearFilter(handlerKey));
      }
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
          {!loading && !error && products && (
            <FilterSection>
              {filterOptionsData.map(
                ({ id, openerText, options, dropdownMenuStyle }) => {
                  return (
                    <Dropdown
                      key={id}
                      openerButtonText={openerText}
                      dropdownItemslist={options}
                      handleDropdownItemClick={(itemId) =>
                        handleFilterSelect(
                          openerText.toLowerCase(),
                          options,
                          itemId
                        )
                      }
                      {...selectDropdownStyles}
                      dropdownMenuStyle={
                        dropdownMenuStyle ??
                        selectDropdownStyles.dropdownMenuStyle
                      }
                    />
                  );
                }
              )}
            </FilterSection>
          )}
          {renderItems}
        </Suspense>
      </section>
    </>
  );
};

export default memo(ProductsContainer);
