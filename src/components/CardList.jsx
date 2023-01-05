
const CardList = ({data}) => {

    return (
        <>
            <div className="relative flex items-center my-5 bg-gray-600 rounded-xl">
                <div id="slider" className="max-h-[120px] overflow-y-auto scroll whitespace-nowrap scroll-smooth">  
                    {data.map((item) => {
                       return (
                            <div className="my-3" key={item.id}>
                                <img
                                className="w-[69px] inline-block p-2 cursor-pointer hover:scale-105 ease-in-out duration-300 rounded-2xl"
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