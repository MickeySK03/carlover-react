import headerLogo from "../assets/headerLogo.png";
export default function Footer() {
  return (
    <div className="bg-yellow-300 flex flex-col justify-center items-center h-1/3">
      <img src={headerLogo} alt="footer" className="h-28 mt-2" />
      <h1>2023 CarLoverTH.All Rights reserved</h1>
    </div>
  );
}
