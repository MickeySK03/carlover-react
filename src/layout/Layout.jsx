import { Outlet } from "react-router-dom";
import Header from "./Header";
// import Footer from "./Footer";

export default function Layout() {
  let layout = (
    <div className="flex flex-col h-full w-full">
      <div className="fixed w-full top-0 h-16 z-20">
        <Header />
      </div>
      <div className="w-full  max-h-screen">
        <div className="h-16"></div>
        <div className="w-full">
          <Outlet />
        </div>
        {/* <div className="fixed bottom-0 w-full">
          <Footer />
        </div> */}
      </div>
    </div>
  );

  return <>{layout}</>;
}
