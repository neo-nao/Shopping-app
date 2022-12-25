import { useState, useEffect, memo, useMemo, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getAsyncProducts,
  filterProducts,
  clearFilter,
  resetFilter,
} from "../../redux/prodcuts/productsSlice";
import Dropdown from "../../components/common/Dropdown/Dropdown";
import {
  ItemsContainer,
  FilterSection,
  selectDropdownStyles,
} from "./productPageDatas";
import { MdOutlineDone } from "react-icons/md";
import Loading from "../../components/common/Loading/Loading";
import FullPageHeight from "../../components/common/FullPageHeight/FullPageHeight";

const Product = lazy(() => import("../../components/common/Product/Product"));

const ProductsPage = () => {
  const { loading, error, products } = useSelector((state) => state.products);

  const initialFilterDatasState = useMemo(
    () => [
      {
        id: 1,
        openerText: "Category",
        options: [
          { id: 1, text: "Unset", accessText: "Unset" },
          { id: 2, text: "Athlete", accessText: "Athlete" },
          { id: 3, text: "Walking", accessText: "Walking" },
          { id: 4, text: "Hiking", accessText: "Hiking" },
          { id: 5, text: "Dancing", accessText: "Dancing" },
        ],
      },
      {
        id: 2,
        openerText: "Type",
        options: [
          { id: 1, text: "Unset", accessText: "Unset" },
          { id: 2, text: "Sneaker", accessText: "Sneaker" },
          { id: 3, text: "Chuck taylor", accessText: "Chuck taylor" },
          { id: 4, text: "Boots", accessText: "Boots" },
          { id: 5, text: "Kids", accessText: "Kids" },
          { id: 6, text: "Formal", accessText: "Formal" },
        ],
        dropdownMenuStyle: `
    ${selectDropdownStyles.dropdownMenuStyle}
    @media (max-width:355px) and (min-width:261px){
      left: calc(-100% - 20px);
    }
    `,
      },
      {
        id: 3,
        openerText: "Color",
        options: [
          { id: 1, text: "Unset", accessText: "Unset" },
          { id: 2, text: "Red", accessText: "Red" },
          { id: 3, text: "Orange", accessText: "Orange" },
          { id: 4, text: "Yellow", accessText: "Yellow" },
          { id: 5, text: "Green", accessText: "Green" },
          { id: 6, text: "Blue", accessText: "Blue" },
          { id: 7, text: "Purple", accessText: "Purple" },
          { id: 8, text: "Brown", accessText: "Brown" },
          { id: 9, text: "Black", accessText: "Black" },
          { id: 10, text: "White", accessText: "White" },
        ],
        dropdownMenuStyle: `
    ${selectDropdownStyles.dropdownMenuStyle}
    @media (max-width:500px) and (min-width:378px){
      left: calc(-100% - 11px) !important;
    }
    @media (max-width:266px){
      left: 0;
    }
    `,
      },
    ],
    []
  );

  const [currentOption, setCurrentOption] = useState(null);

  const [filterOptionsData, setFilterOptionsData] = useState(
    initialFilterDatasState
  );

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

    return () => {
      dispatch(resetFilter());
    };
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

export default memo(ProductsPage);
