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

const getStockLabel = (stock) => {
  const safeStock = Math.max(stock, 0);

  if (safeStock === 0) {
    return (
      <span className="px-3 py-1 rounded-full bg-red-100 text-red-600 text-xs font-semibold">
        Out of stock (0)
      </span>
    );
  }

  if (safeStock <= 5) {
    return (
      <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs font-semibold">
        The quantity is small ({safeStock})
      </span>
    );
  }

  return (
    <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
      Available ({safeStock})
    </span>
  );
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
  <div className="space-y-4">

    {/* top bar */}
    <div className="bg-white rounded-xl shadow p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
      <input
        type="text"
        placeholder="Search product..."
        className="w-full md:w-80 border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-green-400"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="text-sm text-gray-500">
        Total products: <span className="font-bold text-black">{products.length}</span>
      </div>
    </div>

    {/* empty state */}
    {products.length === 0 && (
      <div className="bg-white rounded-xl shadow p-10 text-center text-gray-500">
        No products yet.
      </div>
    )}

    {/* no search result */}
    {products.length > 0 && filteredProducts.length === 0 && (
      <div className="bg-white rounded-xl shadow p-10 text-center text-gray-500">
        No product found for: <span className="font-semibold">{search}</span>
      </div>
    )}

    {/* list */}
    {filteredProducts.length > 0 && (
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="grid grid-cols-12 bg-gray-100 px-4 py-3 text-sm font-semibold text-gray-600">
          <div className="col-span-4">Product</div>
          <div className="col-span-2">Category</div>
          <div className="col-span-2">Price</div>
          <div className="col-span-2">Stock</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>

        <div className="divide-y">
          {filteredProducts.map((p) => (
            <div
              key={p._id}
              className="grid grid-cols-12 items-center px-4 py-4 hover:bg-gray-50 transition"
            >
              <div className="col-span-4">
                <h2 className="font-semibold text-gray-800">{p.name}</h2>
              </div>

              <div className="col-span-2 text-sm text-gray-500">
                {p.category}
              </div>

              <div className="col-span-2 font-semibold text-green-600">
                {p.price} DH
              </div>

              <div className="col-span-2">
                {getStockLabel(p.stock)}
              </div>

              <div className="col-span-2 flex justify-end gap-3">
                <button
                  onClick={() => handleEdit(p)}
                  className="px-3 py-1 rounded-md bg-blue-50 text-blue-600 text-sm font-medium hover:bg-blue-100"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(p._id)}
                  className="px-3 py-1 rounded-md bg-red-50 text-red-600 text-sm font-medium hover:bg-red-100"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    )}

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