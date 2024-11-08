import banner from "./assets/banner.png";
import { CreateToken } from "./CreateToken";
export const Banner = () => {
  return (
    <div className="relative">
      <img src={banner} alt="banner" className="w-full h-full" />
      <CreateToken className="absolute right-[7%] bottom-[15%]" />
    </div>
  );
};
