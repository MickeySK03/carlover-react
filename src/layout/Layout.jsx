import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
// import Footer from "./Footer";

export default function Layout() {
  let layout = (
    <div className="flex flex-col h-screen w-full">
      <div className="fixed w-full top-0 h-16 z-20">
        <Header />
      </div>
      <div className="flex-grow">
        <div className="h-16"></div>
        <div className="">
          <Outlet />
        </div>
        {/* <div className="fixed bottom-0 w-full">
          <Footer />
        </div> */}
      </div>
      <div className="bottom-0">
        <Footer />
      </div>
    </div>
  );

  return <>{layout}</>;
}
