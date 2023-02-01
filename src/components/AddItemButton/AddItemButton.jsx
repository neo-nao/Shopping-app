import useAddItem from "../../hooks/useAddItem";
import Button from "../common/Button/Button";
import { IoAddSharp } from "react-icons/io5";

const AddItemButton = ({
  itemId,
  text = "Add",
  activeText = "Remove",
  style,
}) => {
  const [isItemAdded, addItem] = useAddItem(itemId);

  return (
    <Button onClick={addItem} active={isItemAdded} style={style}>
      <span style={{ padding: "0 5px" }}>
        {isItemAdded ? activeText : text}
      </span>
      <IoAddSharp
        style={{
          transition: "transform .2s ease",
          fontSize: "22.5px",
          transform: isItemAdded ? "rotate(45deg)" : "",
        }}
      />
    </Button>
  );
};

export default AddItemButton;
