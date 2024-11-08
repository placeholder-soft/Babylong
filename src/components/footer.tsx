import icon from "./_/icon.png"
export const Footer = () => {
  return (
    <div className="flex h-[101px] w-full items-center justify-between bg-white px-[66px]">
      <p>Copyright @2024</p>
      <img className="w-[118px]" src={icon} alt="icon" />
    </div>
  )
}
