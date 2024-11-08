import { Footer } from "../../components/footer"
import { Banner } from "./Banner"
import { WireKingHillView } from "./KingHillView"
import { WireListContent } from "./ListContentView"

export const HomePage = () => {
  return (
    <div>
      <Banner />
      <WireListContent />
      <WireKingHillView />
      <Footer />
    </div>
  )
}
