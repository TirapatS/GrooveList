
const ShowcasePlaylist = ({ data, handleClick }) => {    

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
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ShowcasePlaylist