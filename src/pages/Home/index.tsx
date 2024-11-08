import { SearchProvider } from "../../context/SearchContext"
import { Footer } from "../../components/footer"
import { Banner } from "./Banner"
import { WireListContent } from "./ListContentView"

export const HomePage = () => {
  return (
    <SearchProvider>
      <Banner />
      <WireListContent />
      <Footer />
    </SearchProvider>
  )
}
