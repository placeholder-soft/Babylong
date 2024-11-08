import kingHill from './_/kingHill.png'
import banner from './_/banner.png'
import nft from './_/nft.png'
import hot from './_/hot.png'
import leftClasses from './_/leftClasses.png'
import rightClasses from './_/rightClasses.png'
import { CreateToken } from '../CreateToken'




const KingHillView = () => {
    return <>
        <div className="bg-[#FFCA05] border-t border-black py-[122px] flex flex-col items-center gap-[84px] overflow-hidden">
            <img className='h-[108px] ml-[26px]' src={kingHill} alt="king hill" />
            <div className="h-[442px] w-[1117px] relative bg-white rounded-3xl flex items-center gap-2.5 ">
                <img className='h-[394px]' src={nft} alt="nft" />
                <img className='absolute -top-[70px] -left-[100px] h-[200px]' src={hot} alt="hot" />
                <div className='flex flex-col gap-7'>
                    <p className='text-4xl font-bold'>TOKEN-NAME</p>
                    <div className='flex flex-col gap-1'>
                        <p>Created by <span className='underline'>2B5XZX</span> </p>
                        <p className='text-[#D90368]'>Market cap <span className='font-bold'>47.50K</span></p>
                    </div>
                    <p>
                     <span className='font-bold'>America/ACC (ticker: USA/ACC):</span> We are so back</p>
                </div>
                <img className='absolute -left-[444px] bottom-[71px] h-[123px]' src={leftClasses} alt="" />
                <img className='absolute -right-[447px] h-[123px] top-[95px]' src={rightClasses} alt="" />
            </div>
        </div>
        <div style={{ backgroundImage: `url(${banner})` }} className="h-[287px] w-full bg-cover bg-center relative" >
        <CreateToken className='absolute bottom-[106px] right-[90px]' />

        </div>
    </>
}


export const WireKingHillView = () => {
    return <KingHillView />
}
