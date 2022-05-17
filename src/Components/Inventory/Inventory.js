import React from "react";

const Inventory = () => {
  return (
    <div>
      <h2>This is inventory</h2>
    </div>
  );
};

export default Inventory;

const items = [
  { id: "c222", name: "coffee" },
  { id: "t333", name: "tea" },
  { id: "j555", name: "juice" },
];

const item = items.filter((item) => item._id != "j555");
console.log(item);
