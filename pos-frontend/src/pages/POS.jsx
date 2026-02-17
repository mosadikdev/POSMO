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
    setCart([...cart, product]);
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="h-screen grid grid-cols-3">
      
      {/* PRODUCTS */}
      <div className="col-span-2 p-4 bg-gray-100">
        <div className="grid grid-cols-4 gap-4 auto-rows-[140px]">
          {products.map((p) => (
            <div
              key={p.id}
              onClick={() => addToCart(p)}
              className="bg-white shadow rounded flex flex-col items-center justify-center text-lg font-semibold cursor-pointer hover:bg-green-100"
            >
              <div>{p.name}</div>
              <div className="text-sm text-gray-500">{p.price} DH</div>
            </div>
          ))}
        </div>
      </div>

      {/* CART */}
      <div className="bg-white p-4 border-l flex flex-col">
        <h2 className="text-xl font-bold mb-4">Cart</h2>

        <div className="flex-1 space-y-2 overflow-y-auto">
          {cart.map((item, index) => (
            <div key={index} className="flex justify-between border-b pb-1">
              <span>{item.name}</span>
              <span>{item.price} DH</span>
            </div>
          ))}
        </div>

        <div className="border-t pt-4 mt-4">
          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>{total} DH</span>
          </div>

          <button className="mt-4 w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">
            Pay
          </button>
        </div>
      </div>

    </div>
  );
}