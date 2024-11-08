import { WireKingHillView } from "./KingHillView"
import { WireListContent } from "./ListContentView"
import ConnectWallet from "./ConnectWallet";

export const HomePage = () => {
  return (
    <div>
      <WireListContent />
      <WireKingHillView />
      <ConnectWallet />
    </div>
  );
};
