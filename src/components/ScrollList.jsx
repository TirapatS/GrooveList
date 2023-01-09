import { useSetRecoilState } from "recoil"

const CardList = ({data}) => {

    return (
        <>
            <div className="relative my-5 bg-gray-600 bg-opacity-25 rounded-xl">
                <div id="slider" className="max-h-[120px] laptop:max-h-[320px] overflow-y-auto scroll whitespace-nowrap scroll-smooth scrollbar scrollbar-thumb-gray-600 scrollbar-track-GLblack">  
                    {data.map((item) => {
                       return (
                            <div className="my-3" key={item.id}>
                                <img
                                className="w-[69px] laptop:w-[120px] inline-block p-2 cursor-pointer hover:scale-105 ease-in-out duration-300 rounded-2xl shadow-lg"
                                src={item.images[0].url}
                                alt={item.name + 'thumbnail'}
                                />

                                <p className="text-GLwhite text-m ml-2 truncate font-extrabold">{item.name}</p>
                                <p className="text-GLwhite text-m ml-2 truncate">{item.artists[0].name}</p>
                           </div>
                       )
                    })}
                </div>
            </div>
            <button className="text-GLwhite right-2.5 bottom-2.5 bg-gray-600 font-body rounded-lg text-sm px-4 py-2 mb-5">View all</button> 
        </>
    )
}

export default CardList