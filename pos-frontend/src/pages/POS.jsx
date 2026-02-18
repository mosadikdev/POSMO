import { useState } from "react";

const products = [
  { id: 1, name: "Perfums", price: 50 },
  { id: 2, name: "Oils", price: 30 },
  { id: 3, name: "Flacons", price: 10 },
  { id: 4, name: "Perfums Premium", price: 80 },
  { id: 5, name: "Oils Deluxe", price: 60 },
  { id: 6, name: "Flacons 50ml", price: 15 },
];

export default function POS() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
      const updatedCart = cart.map((item) =>
        item.id === product.id
          ? { ...item, qty: item.qty + 1 }
          : item
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  const decreaseQty = (id) => {
    const updatedCart = cart
      .map((item) =>
        item.id === id ? { ...item, qty: item.qty - 1 } : item
      )
      .filter((item) => item.qty > 0);

    setCart(updatedCart);
  };

  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <div className="h-screen grid grid-cols-3">
      {/* PRODUCTS */}
      <div className="col-span-2 p-4 bg-gray-100">
        <div className="grid grid-cols-4 gap-4 auto-rows-[140px]">
          {products.map((p) => (
            <div
              key={p.id}
              onClick={() => addToCart(p)}
              className="bg-white shadow rounded flex flex-col items-center justify-center text-lg font-semibold cursor-pointer hover:bg-green-100 transition"
            >
              <div>{p.name}</div>
              <div className="text-sm text-gray-500">
                {p.price} DH
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CART */}
      <div className="bg-white p-4 border-l flex flex-col">
        <h2 className="text-xl font-bold mb-4">Cart</h2>

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
                {/* Quantity Controls */}
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

                {/* Delete */}
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

        {/* TOTAL + ACTIONS */}
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