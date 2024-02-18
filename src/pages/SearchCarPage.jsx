import CarListDemo from "../features/products/CarListDemo";
import { useAuth } from "../hooks/use-auth";
import Loading from "../components/Loading";

export default function SearchCarPage() {
  const { loading, resultCar } = useAuth();

  return (
    <>
      {loading && <Loading />}
      <div>
        {resultCar.length > 0 ? (
          <div className="grid gap-4 grid-rows-[auto_1fr] grid-cols-5  mx-10 mb-3">
            {resultCar.map((el) => (
              <CarListDemo key={el.id} carObj={el} />
            ))}
          </div>
        ) : (
          <div className="text-center">ไม่มีรถที่คุณค้นหา</div>
        )}
      </div>
    </>
  );
}
