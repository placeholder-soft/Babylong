import { Banner } from "./Banner";
import ConnectWallet from "./ConnectWallet";
import { WireKingHillView } from "./KingHillView";
import { WireListContent } from "./ListContentView";

export const HomePage = () => {
  return (
    <div>
      <Banner />
      <ConnectWallet />
      <WireListContent />
      <WireKingHillView />
    </div>
  );
};
