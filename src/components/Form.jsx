import React from "react";

const Form = ({
  setDescription,
  setQuantity,
  quantity,
  description,
  handleSubmit,
}) => {
  return (
    <form className="add-form" onSubmit={(e) => handleSubmit(e)}>
      <h3>what do you need for your 💝 trip?</h3>
      <select
        name=""
        value={quantity}
        id=""
        onChange={(e) => setQuantity(e.target.value)}
      >
        {Array.from({ length: 20 }, (_, idx) => idx + 1).map((i) => (
          <option key={i} value={i}>
            {i}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="add item"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default Form;
