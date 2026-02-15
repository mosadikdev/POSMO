export default function POS() {
  return (
    <div className="h-screen grid grid-cols-3">
      
      {/* Products */}
      <div className="col-span-2 p-4 grid grid-cols-4 gap-4 bg-gray-100">
        <div className="bg-white p-4 shadow rounded">Perfume</div>
        <div className="bg-white p-4 shadow rounded">Oil</div>
        <div className="bg-white p-4 shadow rounded">Bottle</div>
      </div>

      {/* Cart */}
      <div className="bg-white p-4 border-l">
        <h2 className="text-xl font-bold mb-4">Cart</h2>

        <div className="flex justify-between">
          <span>Perfume</span>
          <span>50 DH</span>
        </div>

        <div className="mt-6 border-t pt-4">
          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>50 DH</span>
          </div>

          <button className="mt-4 w-full bg-green-500 text-white py-2 rounded">
            Pay
          </button>
        </div>
      </div>

    </div>
  )
}