import CarListDemo from "../features/products/CarListDemo";
import { useAuth } from "../hooks/use-auth";
import Loading from "../components/Loading";

export default function AllCarsPage() {
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

  // console.log(allCar);
  return (
    <>
      {loading && <Loading />}
      {allCar.length > 0 ? (
        <div className="grid gap-4 grid-rows-[auto_1fr] grid-cols-4  mx-10 mb-3">
          {allCar.map((el) => (
            <CarListDemo key={el.id} carObj={el} carId={el.id} />
          ))}
        </div>
      ) : (
        <div className="text-center">no car to show</div>
      )}
    </>
  );
}
