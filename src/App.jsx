import Loading from "./components/Loading";
import Route from "./router/Route";
import { useAuth } from "./hooks/use-auth";
import { ToastContainer } from "react-toastify";

function App() {
  const { initialLoading } = useAuth();
  if (initialLoading) {
    return <Loading />;
  }
  return (
    <>
      <Route />
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        theme="colored"
      />
    </>
  );
}

export default App;
