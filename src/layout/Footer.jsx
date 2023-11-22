import headerLogo from "../assets/headerLogo.png";
export default function Footer() {
  return (
    <div className="bg-yellow-300 flex flex-col justify-center items-center bottom-0 sticky">
      <img src={headerLogo} alt="footer" className="h-10 mt-2" />
      <div className="text-sm">2023 CarLoverTH.All Rights reserved</div>
    </div>
  );
}
