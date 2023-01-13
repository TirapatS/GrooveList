
const CardList = ({data}) => {

    let liked = false

    return (
        <>
            <div className="relative my-5 bg-gray-600 bg-opacity-25 rounded-xl">
                <div id="slider" className="max-h-[120px] laptop:max-h-[320px] overflow-y-auto scroll whitespace-nowrap scroll-smooth scrollbar scrollbar-thumb-gray-600 scrollbar-track-GLblack">  
                    {data.map((item) => {
                       return (
                            <div className="my-3 laptop:flex justify-around items-center" key={item.id}>
                                <img
                                className="w-[69px] laptop:w-[200px] inline-block p-2 cursor-pointer hover:scale-105 ease-in-out duration-300 rounded-2xl shadow-lg"
                                src={item.images[0].url}
                                alt={item.name + 'thumbnail'}
                                />

                                <div className="laptop:w-[200px] content-center">
                                    <p className="text-GLwhite text-m ml-2 truncate font-extrabold">{item.name}</p>
                                    <p className="text-GLwhite text-m ml-2 truncate">{item.artists[0].name}</p>
                                </div>

                                <div className="mt-2">
                                    {
                                        (!liked) ? 
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="gray" className="w-7 h-7 laptop:w-12 h-12">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                        </svg>
                                        :
    
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" className="w-7 h-7 laptop:w-12 h-12">
                                            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                                        </svg>
                                    } 
                                </div>
                           </div>
                       )
                    })}
                </div>
            </div>
        </>
    )
}

export default CardList