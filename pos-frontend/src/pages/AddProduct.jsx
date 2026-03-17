import { useState, useEffect } from "react";
import axios from "axios";

export default function AddProduct() {

  const [view, setView] = useState("list");
  const [products, setProducts] = useState([]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");

  const fetchProducts = () => {
    axios.get("http://localhost:5000/products")
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAdd = async () => {
    try {

      await axios.post("http://localhost:5000/products", {
        name,
        price: Number(price),
        category,
        stock: Number(stock)
      });

      alert("Product added");

      setName("");
      setPrice("");
      setCategory("");
      setStock("");

      setView("list");
      fetchProducts();

    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/products/${id}`);
    fetchProducts();
  };

  return (
    <div className="p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">

        <h1 className="text-2xl font-bold">
          Products
        </h1>

        {view === "list" && (
          <button
            onClick={() => setView("add")}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Add Product
          </button>
        )}

      </div>

      {/* LIST */}
      {view === "list" && (
        <div className="grid grid-cols-4 gap-4">

          {products.map((p) => (
            <div
              key={p._id}
              className="border p-3 rounded shadow"
            >
              <div className="font-bold">{p.name}</div>
              <div>{p.price} DH</div>
              <div className="text-sm text-gray-500">
                {p.category}
              </div>
              <div className="text-sm">
                Stock: {p.stock}
              </div>

              <button
                onClick={() => handleDelete(p._id)}
                className="mt-2 text-red-500 text-sm"
              >
                Delete
              </button>

            </div>
          ))}

        </div>
      )}

      {/* FORM */}
      {view === "add" && (
        <div className="max-w-md space-y-4">

          <input
            className="w-full border p-2"
            placeholder="Name"
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

          <div className="flex gap-2">

            <button
              onClick={handleAdd}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Save
            </button>

            <button
              onClick={() => setView("list")}
              className="bg-gray-400 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>

          </div>

        </div>
      )}

    </div>
  );
}