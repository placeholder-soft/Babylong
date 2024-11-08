import { useNavigate } from "react-router"
import CreateTokenIcon from "./assets/create-token.svg?react"

export const CreateToken = ({ className }: { className?: string }) => {
  const navigate = useNavigate()

  return (
    <button className={className} onClick={() => navigate("/create-token")}>
      <CreateTokenIcon />
    </button>
  )
}
