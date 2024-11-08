import { SearchProvider } from "../../context/SearchContext"
import { Footer } from "../../components/footer"
import { Banner } from "./Banner"
import { WireKingHillView } from "./KingHillView"
import { WireListContent } from "./ListContentView"

export const HomePage = () => {
  return (
    <SearchProvider>
      <Banner />
      <WireListContent />
      <WireKingHillView />
      <Footer />
    </SearchProvider>
  )
}
