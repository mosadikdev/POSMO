import { useState, useEffect } from "react";
import axios from "axios";

export default function AddProduct() {

  const [view, setView] = useState("list");
  const [products, setProducts] = useState([]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);

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

    const productData = {
      name,
      price: Number(price),
      category,
      stock: Number(stock)
    };

    if (editingProduct) {
      // ✏️ UPDATE
      await axios.put(
        `http://localhost:5000/products/${editingProduct._id}`,
        productData
      );
    } else {
      // ➕ ADD
      await axios.post(
        "http://localhost:5000/products",
        productData
      );
    }

    alert("Saved successfully");

    setName("");
    setPrice("");
    setCategory("");
    setStock("");
    setEditingProduct(null);

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


  const handleEdit = (product) => {
  setEditingProduct(product);

  setName(product.name);
  setPrice(product.price);
  setCategory(product.category);
  setStock(product.stock);

  setView("add");
};


  return (
    <div className="p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">

        <h1 className="text-2xl font-bold">
  {editingProduct ? "Edit Product" : "Add Product"}
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
  className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 flex flex-col justify-between"
>
  <div>
    <h2 className="font-bold text-lg mb-1">
      {p.name}
    </h2>

    <p className="text-gray-500 text-sm">
      {p.category}
    </p>
  </div>

  <div className="mt-3">
    <p className="text-green-600 font-bold text-lg">
      {p.price} DH
    </p>

    <div className="mt-1 text-sm">
      {p.stock > 0 ? (
        <span className="text-gray-600">
          Stock: {p.stock}
        </span>
      ) : (
        <span className="text-red-500 font-semibold">
          Out Of Stock
        </span>
      )}
    </div>
  </div>

  <div className="flex justify-between mt-4">

    <button
      onClick={() => handleEdit(p)}
      className="text-blue-500 text-sm hover:underline"
    >
      Edit
    </button>

    <button
      onClick={() => handleDelete(p._id)}
      className="text-red-500 text-sm hover:underline"
    >
      Delete
    </button>

  </div>
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