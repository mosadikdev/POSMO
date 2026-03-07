export default function Receipt({ sale, close }) {
  if (!sale) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">

      <div className="bg-white p-6 rounded w-80">

        <h2 className="text-xl font-bold text-center mb-4">
          POSMO STORE
        </h2>

        <p className="text-sm text-center mb-4">
          {sale.date}
        </p>

        <div className="border-t border-b py-2 mb-3">

          {sale.items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between text-sm"
            >
              <span>
                {item.name} x{item.qty}
              </span>

              <span>
                {item.price * item.qty} DH
              </span>
            </div>
          ))}

        </div>

        <div className="flex justify-between font-bold text-lg mb-4">
          <span>Total</span>
          <span>{sale.total} DH</span>
        </div>

        <div className="flex gap-2">

          <button
            onClick={() => window.print()}
            className="flex-1 bg-green-500 text-white py-2 rounded"
          >
            Print
          </button>

          <button
            onClick={close}
            className="flex-1 bg-gray-400 text-white py-2 rounded"
          >
            Close
          </button>

        </div>

      </div>

    </div>
  );
}