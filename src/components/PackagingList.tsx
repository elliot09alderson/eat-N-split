import React, { useState } from "react";
import Item from "./Item";
export interface ItemsList {
  id: number;
  description: string;
  quantity: number;
  packed: boolean;
}
interface Props {
  items: ItemsList[];
  deleteItem: (id: number) => void;
  editItem: (id: number) => void;
}

const PackagingList = ({ items, editItem, deleteItem }: Props) => {
  let sortedItems;
  const [sort, setSort] = useState("input");
  if (sort === "input") sortedItems = items;

  if (sort === "description") {
    console.log(
      items.slice().sort((a, b) => a.description.localeCompare(b.description))
    );
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  }

  if (sort === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      <ul>
        {sortedItems?.map((item) => (
          <Item
            key={item.id}
            data={item}
            editItem={editItem}
            deleteItem={deleteItem}
          />
        ))}{" "}
      </ul>

      <div className="actions">
        <select
          name=""
          id=""
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="input">Sort by input Order</option>{" "}
          <option value="description">Sort by description</option>
          <option value="packed">Sort by Packed status</option>
        </select>
      </div>
    </div>
  );
};

export default PackagingList;
