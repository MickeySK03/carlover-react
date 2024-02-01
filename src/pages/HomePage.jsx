import bodyPic from "../assets/Used-Car-Home.png";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/use-auth";
import CarouselPage from "./CarouselPage";
import Loading from "../components/Loading";

export default function HomePage() {
  const { loading, allCar } = useAuth();

  // useEffect(() => {
  //   axios
  //     .get("/allcars")
  //     .then((res) => {
  //       setAllCar(res.data.car);
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, [setAllCar, setLoading]);

  return (
    <>
      {loading && <Loading />}
      <div className="">
        <div className="flex justify-center">
          <img src={bodyPic} alt="usecarhome" className="items-center" />
        </div>
        <div className="text-end mx-6">
          <Link to="/allcars">
            <button className="">ดูเพิ่มเติม</button>
          </Link>
        </div>
        {allCar.length > 0 ? (
          <div className="carousel carousel-center w-full h-auto p-4 space-x-4 bg-neutral rounded-box">
            {allCar.map((el) => (
              <CarouselPage
                allCar={allCar}
                key={el.id}
                carObj={el}
                carId={el.id}
              />
            ))}
          </div>
        ) : (
          <div className="text-center">no car to preview</div>
        )}
      </div>
    </>
  );
}
