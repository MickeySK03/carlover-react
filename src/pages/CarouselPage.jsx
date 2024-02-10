import { Link } from "react-router-dom";
import TitleLetter from "../components/TitleLetter";
import LocaleString from "../components/LocaleString";
export default function Carousel({ carObj, carId }) {
  return (
    <Link to={`/allcars/${carId}`}>
      <div className="felx flex-col mx-2 hover:ring rounded-xl ring-sky-600  mt-2 hover:bg-slate-300 bg-slate-200">
        <div className="">
          <img
            src={carObj.imageCar[0]?.image}
            className="mx-auto rounded-3xl object-cover px-2 h-[270px] w-[400px]"
          />
        </div>
        <div className="flex justify-center items-center rounded-lg w-full my-3">
          <div>
            <div className="flex flex-row gap-2 text-xl font-bold">
              <div>{carObj.year}</div>
              <div>
                <TitleLetter text={carObj.brand} />
              </div>
              <div>{carObj.model}</div>
            </div>
            <div>
              <LocaleString number={carObj.mileage} /> km
            </div>
            <div>
              ราคา <LocaleString number={carObj.price} /> บาท
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
