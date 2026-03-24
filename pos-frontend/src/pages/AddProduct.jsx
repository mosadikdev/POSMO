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
  const [search, setSearch] = useState("");

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


const filteredProducts = products.filter((p) =>
  p.name.toLowerCase().includes(search.toLowerCase())
);

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

      <input
  type="text"
  placeholder="Search product..."
  className="mb-4 p-2 border rounded w-full"
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>

      {/* LIST */}
      {view === "list" && (
        <div className="space-y-3">

          {filteredProducts.map((p) => (
  <div
    key={p._id}
    className="bg-white p-4 rounded-lg shadow flex justify-between items-center hover:shadow-md transition"
  >

    {/* LEFT */}
    <div>
      <h2 className="font-bold text-lg">
        {p.name}
      </h2>

      <p className="text-sm text-gray-500">
        {p.category}
      </p>

      <p className="text-green-600 font-semibold">
        {p.price} DH
      </p>
    </div>

    {/* RIGHT */}
    <div className="flex items-center gap-4">

      {/* STOCK */}
      <div className="text-sm">
        {p.stock > 0 ? (
          <span className="text-gray-600">
            {p.stock}
          </span>
        ) : (
          <span className="text-red-500 font-bold">
            Out Of Stock
          </span>
        )}
      </div>

      {/* ACTIONS */}
      <button
        onClick={() => handleEdit(p)}
        className="text-blue-500 text-sm"
      >
        Edit
      </button>

      <button
        onClick={() => handleDelete(p._id)}
        className="text-red-500 text-sm"
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