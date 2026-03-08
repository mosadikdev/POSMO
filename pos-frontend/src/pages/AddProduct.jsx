import { useState } from "react";

export default function AddProduct() {

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  const handleAdd = () => {

    const products =
      JSON.parse(localStorage.getItem("pos_products")) || [];

    const newProduct = {
      id: Date.now(),
      name,
      price: Number(price),
      category,
    };

    const updated = [...products, newProduct];

    localStorage.setItem(
      "pos_products",
      JSON.stringify(updated)
    );

    setName("");
    setPrice("");
    setCategory("");

    alert("Product added");
  };

  return (
    <div className="p-10">

      <h1 className="text-2xl font-bold mb-6">
        Add Product
      </h1>

      <div className="space-y-4 max-w-md">

        <input
          className="w-full border p-2"
          placeholder="Product name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />

        <input
          className="w-full border p-2"
          placeholder="Price"
          value={price}
          onChange={(e)=>setPrice(e.target.value)}
        />

        <input
          className="w-full border p-2"
          placeholder="Category"
          value={category}
          onChange={(e)=>setCategory(e.target.value)}
        />

        <button
          onClick={handleAdd}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add Product
        </button>

      </div>

    </div>
  );
}