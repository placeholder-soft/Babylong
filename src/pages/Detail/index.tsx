import { useParams } from "react-router"
import { useTokenInfo } from "../../hooks/useToken"

export default function Detail() {
  const { address } = useParams()
  useTokenInfo(address)
  return <div>Detail</div>
}
