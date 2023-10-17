export default function SellCarPage() {
  return (
    <div className="">
      <h1 className="text-center text-lg m-3">ลงขายรถ</h1>
      <div className="flex flex-row justify-evenly">
        <div>
          <h4>Brand</h4>
          <input
            type="text"
            placeholder="brand"
            className="border bg-slate-50"
          />
          <h4>Model</h4>
          <input
            type="text"
            placeholder="model"
            className="border bg-slate-50"
          />
          <h4>years</h4>
          <input
            type="text"
            placeholder="years"
            className="border bg-slate-50"
          />
          <h4>color</h4>
          <input
            type="text"
            placeholder="color"
            className="border bg-slate-50"
          />
          <h4>mileage</h4>
          <input
            type="text"
            placeholder="mileage"
            className="border bg-slate-50"
          />
        </div>
        <div>
          <h4>fueltype</h4>
          <input
            type="text"
            placeholder="fuelType"
            className="border bg-slate-50"
          />
          <h4>transmission</h4>
          <input
            type="text"
            placeholder="transmission"
            className="border bg-slate-50"
          />
          <h4>location</h4>
          <input
            type="text"
            placeholder="location"
            className="border bg-slate-50"
          />
          <h4>price</h4>
          <input
            type="text"
            placeholder="price"
            className="border bg-slate-50"
          />
          <h4>book price</h4>
          <input
            type="text"
            placeholder="reservePrice"
            className="border bg-slate-50"
          />
          <h4>description</h4>
          <input
            type="text"
            placeholder="description"
            className="border bg-slate-50"
          />
        </div>
      </div>
      <div className="flex justify-center">
        <button className="border bg-slate-200 p-12">select pic</button>
      </div>
      <div className="flex justify-center mt-5">
        <button className="border bg-blue-300 px-3 rounded-md m-3">
          ลงขาย
        </button>
        <button className="border bg-slate-300 px-3 rounded-md m-3">
          ยกเลิก
        </button>
      </div>
    </div>
  );
}
