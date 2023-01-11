
const ShowcasePlaylist = ({ data, handleClick }) => {    

    const liked = false

    return (
        <div className="bg-GLblack rounded-lg mb-[100px] laptop:mb-[0px]">
            <div className="grid laptop:grid-rows-4 laptop:grid-flow-col gap-4 grid-rows-6 grid-flow-col p-2 laptop:p-0">
                {data.items.map((item) => {
                    return (
                        <div onClick={() => handleClick(item.track.album.id)} className="my-3 laptop:w-[120px] w-[69px] h-[200px]" key={item.track.name}>
                            <img className="rounded-lg hover:p-1" src={item.track.album.images?.[0].url} title={item.track.name}/>
                            <div className="font-extrabold">
                                <p className="text-GLwhite my-2 text-m truncate">{item.track.name}</p>
                                <p className="text-GLwhite text-sm truncate">{item.track.album.artists?.[0].name}</p>
                                
                                <div className="mt-2">
                                    {
                                        (!liked) ? 
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#f9f9f9" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-9 h-9">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                        </svg> :
    
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="red" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-9 h-9">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                        </svg>
                                    } 
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ShowcasePlaylist