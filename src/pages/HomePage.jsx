import bodyPic from "../assets/Used-Car-Home.png";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/use-auth";
import CarouselPage from "./CarouselPage";
import Loading from "../components/Loading";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function HomePage() {
  const { loading, allCar, setSearchCar } = useAuth();

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 5000,
    autoplaySpeed: 4000,
    cssEase: "linear",
  };

  return (
    <>
      {loading && <Loading />}
      <div className="flex flex-col">
        <div className="flex justify-center">
          <img src={bodyPic} alt="usecarhome" className="items-center" />
        </div>
        <div className="text-end mx-6">
          <Link to="/allcars" onClick={() => setSearchCar("")}>
            <button className="">ดูเพิ่มเติม</button>
          </Link>
        </div>
        {allCar.length > 0 ? (
          <div className="overflow-hidden bg-slate-400 py-2 rounded-lg">
            <Slider {...settings}>
              {allCar.map((el) => (
                <CarouselPage
                  allCar={allCar}
                  key={el.id}
                  carObj={el}
                  carId={el.id}
                />
              ))}
            </Slider>
          </div>
        ) : (
          <div className="text-center">no car to preview</div>
        )}
      </div>
    </>
  );
}
