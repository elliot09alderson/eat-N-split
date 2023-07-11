import React from "react";
import { ItemsList } from "./PackagingList";
interface Props {
  data: ItemsList;
  deleteItem: (id: number) => void;
  editItem: (id: number) => void;
}

const Item = ({ data, deleteItem, editItem }: Props) => {
  return (
    <li>
      <span
        style={data.packed === true ? { textDecoration: "line-through" } : {}}
        onClick={() => editItem(data.id)}
      >
        {data.quantity} {data.description}
      </span>
      <button onClick={() => deleteItem(data.id)}>❌</button>
    </li>
  );
};

export default Item;
