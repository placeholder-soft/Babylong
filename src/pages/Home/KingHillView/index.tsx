import kingHill from './_/kingHill.png'
import banner from './_/banner.png'

const KingHillView = () => {
    return <>
        <div className="bg-[#FFCA05] border-t border-black py-[122px] flex flex-col items-center gap-[84px]">
            <img className='h-[108px]' src={kingHill} alt="king hill" />
            <div className="h-[442px] w-[1117px] bg-white rounded-3xl">
            </div>
        </div>
        <div style={{ backgroundImage: `url(${banner})` }} className="h-[287px] w-full bg-cover bg-center" />
    </>
}


export const WireKingHillView = () => {
    return <KingHillView />
}
