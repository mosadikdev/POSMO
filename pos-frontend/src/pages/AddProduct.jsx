import { useState } from "react";
import axios from "axios";

export default function AddProduct() {

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");

  const handleAdd = async () => {

  try {

    const newProduct = {
      name,
      price: Number(price),
      category,
      stock: Number(stock)
    };

    await axios.post(
      "http://localhost:5000/products",
      newProduct
    );

    alert("Product added successfully");

    setName("");
    setPrice("");
    setCategory("");
    setStock("");

  } catch (error) {

    console.log(error);
    alert("Error adding product");

  }

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

        <input
          className="w-full border p-2"
          placeholder="Stock"
          value={stock}
          onChange={(e)=>setStock(e.target.value)}
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