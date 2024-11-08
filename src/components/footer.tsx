import icon from './_/icon.png'
export const Footer = () => {
    return <div className="bg-white flex items-center justify-between h-[101px] px-[66px]">
        <p>Copyright @2024</p>
        <img className='w-[118px]' src={icon} alt="icon" />
    </div>
}