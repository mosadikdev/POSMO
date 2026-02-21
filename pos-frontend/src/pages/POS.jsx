import { useState, useEffect } from "react";


const productsData = [
  { id: 1, name: "Oud Perfume", price: 120, category: "Perfumes" },
  { id: 2, name: "Rose Oil", price: 50, category: "Oils" },
  { id: 3, name: "Amber Oil", price: 70, category: "Oils" },
  { id: 4, name: "Flacon 30ml", price: 15, category: "Flacons" },
  { id: 5, name: "Flacon 50ml", price: 20, category: "Flacons" },
  { id: 6, name: "Musk Perfume", price: 100, category: "Perfumes" },
];

const categories = ["All", "Perfumes", "Oils", "Flacons"];

export default function POS() {
  const [cart, setCart] = useState(() => {
  const savedCart = localStorage.getItem("pos_cart");
  return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
  localStorage.setItem("pos_cart", JSON.stringify(cart));
}, [cart]);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const addToCart = (product) => {
    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  const decreaseQty = (id) => {
    setCart(
      cart
        .map((item) =>
          item.id === id
            ? { ...item, qty: item.qty - 1 }
            : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const clearCart = () => {
  const sales = JSON.parse(localStorage.getItem("pos_sales")) || [];
  const newSale = {
    id: Date.now(),
    items: cart,
    total: total,
    date: new Date().toLocaleString(),
  };

  localStorage.setItem("pos_sales", JSON.stringify([...sales, newSale]));
  setCart([]);
};

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  // FILTER LOGIC
  const filteredProducts = productsData.filter((product) => {
    const matchCategory =
      selectedCategory === "All" ||
      product.category === selectedCategory;

    const matchSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchCategory && matchSearch;
  });

  return (
    <div className="h-screen grid grid-cols-3">
      {/* LEFT SIDE */}
      <div className="col-span-2 p-4 bg-gray-100 flex flex-col">
        {/* SEARCH BAR */}
        <input
          type="text"
          placeholder="Search product..."
          className="mb-4 p-2 border rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* CATEGORIES */}
        <div className="flex gap-2 mb-4 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1 rounded ${
                selectedCategory === cat
                  ? "bg-green-500 text-white"
                  : "bg-white border"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* PRODUCTS GRID */}
        <div className="grid grid-cols-4 gap-4 auto-rows-[140px] overflow-y-auto">
          {filteredProducts.map((p) => (
            <div
              key={p.id}
              onClick={() => addToCart(p)}
              className="bg-white shadow rounded flex flex-col items-center justify-center text-center font-semibold cursor-pointer hover:bg-green-100 transition"
            >
              <div>{p.name}</div>
              <div className="text-sm text-gray-500">
                {p.price} DH
              </div>
              <div className="text-xs text-gray-400">
                {p.category}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CART */}
      <div className="bg-white p-4 border-l flex flex-col">
        <h2 className="text-xl font-bold mb-4">
          Cart ({cart.length})
        </h2>

        <div className="flex-1 space-y-3 overflow-y-auto">
          {cart.length === 0 && (
            <p className="text-gray-400 text-center mt-10">
              Cart is empty
            </p>
          )}

          {cart.map((item) => (
            <div
              key={item.id}
              className="border rounded p-2 shadow-sm"
            >
              <div className="flex justify-between font-semibold">
                <span>{item.name}</span>
                <span>
                  {item.price * item.qty} DH
                </span>
              </div>

              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => decreaseQty(item.id)}
                    className="px-2 bg-gray-200 rounded"
                  >
                    -
                  </button>

                  <span className="font-bold">
                    {item.qty}
                  </span>

                  <button
                    onClick={() => addToCart(item)}
                    className="px-2 bg-gray-200 rounded"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* TOTAL */}
        <div className="border-t pt-4 mt-4">
          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>{total} DH</span>
          </div>

          <button className="mt-3 w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">
            Pay
          </button>

          <button
            onClick={clearCart}
            className="mt-2 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
}