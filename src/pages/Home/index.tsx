import { WireKingHillView } from "./KingHillView"
import { WireListContent } from "./ListContentView"

export const HomePage = () => {
  return (
    <div>
      <WireListContent />
      <WireKingHillView />
    </div>
  )
}
