import headerLogo from "../assets/headerLogo.png";
export default function Footer() {
  return (
    <div className=" bg-yellow-300 flex flex-grow flex-col justify-center items-center bottom-0">
      <img src={headerLogo} alt="footer" className=" mt-2 h-16" />
      <div className="text-sm">2023 CarLoverTH.All Rights reserved</div>
    </div>
  );
}
