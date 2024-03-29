import CarListDemo from "../features/products/CarListDemo";
import { useAuth } from "../hooks/use-auth";
import Loading from "../components/Loading";

export default function AllCarsPage() {
  const { loading, allCar } = useAuth();

  return (
    <>
      {loading && <Loading />}
      <div>
        {allCar.length > 0 ? (
          <div className="grid gap-4 grid-rows-[auto_1fr] grid-cols-5  mx-10 mb-3">
            {allCar.map((el) => (
              <CarListDemo key={el.id} carObj={el} />
            ))}
          </div>
        ) : (
          <div className="text-center">no car to show</div>
        )}
      </div>
    </>
  );
}
