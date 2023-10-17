export default function DetailCarPage() {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-center items-start">
        <div className="h-auto w-1/2">
          <img src="/alfa.jpeg" alt="alfa" className="" />
        </div>
        <div className="w-1/2 h-auto m-3">
          <h1>Alfa Romeo 2000GT Veloce</h1>
          <h1>ปี 1976</h1>
          <h1>566,900 บาท</h1>
          <h1>location</h1>
          <h1>วันที่ลงขาย</h1>
          <div className="border h-48">
            <h1>Description</h1>
          </div>
          <div className="flex justify-center">
            <button className="bg-blue-400 rounded-md py-1 px-5 ">
              Book Car
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-row justify-around w-auto border px-3">
        <hr />
        <div className="flex flex-col w-1/2 ">
          <div className="flex flex-row justify-between mx-10">
            <div>color</div>
            <div>แดง</div>
          </div>
          <hr />
          <div className="flex flex-row justify-between mx-10">
            <div>mileage</div>
            <div>50,000</div>
          </div>
        </div>
        <div className="flex flex-col w-1/2">
          <div className="flex flex-row justify-between mx-10">
            <div>fuelType</div>
            <div>เบนซิน</div>
          </div>
          <hr />
          <div className="flex flex-row justify-between mx-10">
            <div>transmission</div>
            <div>manual 5 speed</div>
          </div>
        </div>
      </div>
    </div>
  );
}
