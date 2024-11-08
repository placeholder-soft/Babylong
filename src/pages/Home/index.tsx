import { WireKingHillView } from "./KingHillView"
import { WireListContent } from "./ListContentView"
import ConnectWallet from "./ConnectWallet";
import { Footer } from "../../components/footer";



export const HomePage = () => {
  return (
    <div>
      <ConnectWallet />
      <WireListContent />
      <WireKingHillView />
      <Footer />
    </div>
  );
};