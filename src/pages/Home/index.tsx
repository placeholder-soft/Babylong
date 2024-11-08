import { WireKingHillView } from "./KingHillView"
import { WireListContent } from "./ListContentView"
import ConnectWallet from "./ConnectWallet";

export const HomePage = () => {
  return (
    <div>
      <ConnectWallet />
      <WireListContent />
      <WireKingHillView />
    </div>
  );
};
