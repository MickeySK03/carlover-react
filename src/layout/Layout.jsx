import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import HeaderSearch from "./HeaderSearch";
// import Footer from "./Footer";

export default function Layout() {
  const { pathname } = useLocation();

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
      </div>
      <div className="bottom-0">
        <Footer />
      </div>
    </div>
  );
  if (pathname === "/login") {
    layout = (
      <div className="flex flex-col h-screen w-full">
        <div className="fixed w-full top-0 h-16 z-20">
          <Header />
        </div>
        <div className="flex flex-grow">
          <Outlet />
        </div>
        <div className="bottom-0">
          <Footer />
        </div>
      </div>
    );
  }
  if (pathname === "/allcars") {
    layout = (
      <div className="flex flex-col h-screen w-full">
        <div className="fixed w-full top-0 h-16 z-20">
          <HeaderSearch />
        </div>
        <div className="flex-grow">
          <div className="h-16"></div>
          <div className="">
            <Outlet />
          </div>
        </div>
        <div className="bottom-0">
          <Footer />
        </div>
      </div>
    );
  }
  return <>{layout}</>;
}
