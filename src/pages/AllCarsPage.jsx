import CarListDemo from "../features/products/CarListDemo";
import { useAuth } from "../hooks/use-auth";
import Loading from "../components/Loading";

export default function AllCarsPage() {
  const { allCar, loading } = useAuth();

  return (
    <>
      {loading && <Loading />}
      <div className="min-h-screen">
        <div className="grid gap-4 grid-rows-[auto_1fr] grid-cols-3  mx-10 mb-3">
          {allCar.map((el) => (
            <CarListDemo key={el.id} carObj={el} carId={el.id} />
          ))}
        </div>
      </div>
    </>
  );
}
