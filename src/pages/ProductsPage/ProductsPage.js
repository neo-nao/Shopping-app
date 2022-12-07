import { useState, useEffect, memo, useMemo, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getAsyncProducts,
  filterProducts,
  clearFilter,
} from "../../redux/prodcuts/productsSlice";
import Dropdown from "../../components/common/Dropdown/Dropdown";
import {
  ItemsContainer,
  FilterSection,
  selectDropdownStyles,
  useFilterOptionsData,
  LoadingContainer,
} from "./productPageDatas";
import { MdOutlineDone } from "react-icons/md";
import Loading from "../../components/common/Loading/Loading";

const Product = lazy(() => import("../../components/common/Product/Product"));

const ProductsPage = () => {
  const { loading, error, products } = useSelector((state) => state.products);

  const [currentOption, setCurrentOption] = useState(null);

  const [filterOptionsData, setFilterOptionsData] = useFilterOptionsData();

  const [dynamicURL, setDynamicURL] = useState(null);

  const filteredProducts = useSelector(
    (state) => state.products.filteredOptions
  );
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const fetchProducts = () => {
    dispatch(getAsyncProducts(dynamicURL));
  };

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
    dynamicURL !== null && fetchProducts();
  }, [dynamicURL]);

  useEffect(() => {
    if (products) {
      !products.length && fetchProducts();
    } else {
      fetchProducts();
    }
  }, []);

  const handleFilterSelect = (handlerKey, options, itemId) => {
    const selectedOption = options.find((option) => option.id === itemId);

    if (selectedOption.accessText !== "Unset") {
      dispatch(
        filterProducts({
          tagKey: handlerKey,
          tagValue: selectedOption.accessText,
        })
      );

      setCurrentOption(handlerKey);
    } else {
      if (filteredProducts[handlerKey].length) {
        dispatch(clearFilter(handlerKey));
        options.forEach((option) => (option.text = option.accessText));
        navigate("/products");
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
        <LoadingContainer>
          <Loading title="Fetching Products..." />
        </LoadingContainer>
      );
    if (error) return <h1>{error}</h1>;

    if (products) {
      if (products.length)
        return <ItemsContainer>{renderProducts()}</ItemsContainer>;
      else return <h1>Empty</h1>;
    }
  }, [loading]);

  return (
    <>
      <section>
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
                    dropdownMenuStyle ?? selectDropdownStyles.dropdownMenuStyle
                  }
                />
              );
            }
          )}
        </FilterSection>
        <Suspense
          fallback={
            <LoadingContainer>
              <Loading title="Loading Products..." />
            </LoadingContainer>
          }
        >
          {renderItems}
        </Suspense>
      </section>
    </>
  );
};

export default memo(ProductsPage);
