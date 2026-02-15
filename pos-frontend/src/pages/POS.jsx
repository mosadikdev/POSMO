export default function POS() {
    return (

        <div className="h-screen grid grid-cols-3">

            <div className="col-span-2 p-4 bg-gray-100">
  
  <div className="grid grid-cols-6 gap-6 auto-rows-[140px]">
    
    <div className="bg-white shadow rounded flex items-center justify-center text-lg font-semibold">
      Perfums
    </div>

    <div className="bg-white shadow rounded flex items-center justify-center text-lg font-semibold">
      Oils
    </div>

    <div className="bg-white shadow rounded flex items-center justify-center text-lg font-semibold">
      Flacons
    </div>

    <div className="bg-white shadow rounded flex items-center justify-center text-lg font-semibold">
      Perfums
    </div>

    <div className="bg-white shadow rounded flex items-center justify-center text-lg font-semibold">
      Flacons
    </div>

    <div className="bg-white shadow rounded flex items-center justify-center text-lg font-semibold">
      Perfums
    </div>
  </div>

</div>

            <div className="m-4">
                    <h2 className="text-xl font-bold mb-4">Cart</h2>

                    <div className="flex justify-between mb-4">
                        <span>Perfums</span>
                        <span>50 DH</span>
                    </div>


                    <div className="flex justify-between border-t font-bold">
                        <span>Total: </span>
                        <span>50 DH</span>
                    </div>


                    <button className="w-full bg-green-500 py-2 rounded shadow mt-4 text-white">Pay</button>

            </div>

        </div>

    )
}