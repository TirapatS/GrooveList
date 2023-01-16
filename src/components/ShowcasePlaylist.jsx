import { useAuthContext } from "../contexts/AuthContext"
import useFavourites from "../hooks/useFavourites"
import { isThisTrackLiked } from "../utils/isThisTrackLiked"
import { SubmitFavourites } from "../utils/handleFavourites"
const ShowcasePlaylist = ({ data }) => {    

    const { currentUser } = useAuthContext()
    const [ docs, loading, error ] = useFavourites(currentUser)    


    return (
        <div className="bg-GLblack rounded-lg mb-[100px] laptop:mb-[0px]">

            {loading && <h1>Loading...</h1>}

            <div className="grid laptop:grid-rows-4 laptop:grid-flow-col gap-4 grid-rows-6 grid-flow-col p-2 laptop:p-0">
                {!loading && data.items.map((item) => {
                    return (
                        <div className="my-3 laptop:w-[120px] w-[69px] h-[200px]" key={item.track.name}>
                            <img className="rounded-lg hover:p-1" src={item.track.album.images?.[0].url} title={item.track.name}/>
                            <div className="font-extrabold">
                                <p className="text-GLwhite my-2 text-m truncate">{item.track.name}</p>
                                <p className="text-GLwhite text-sm truncate">{item.track.album.artists?.[0].name}</p>
                                
                                <div className="mt-2" onClick={(e) => SubmitFavourites(item, currentUser, e)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={isThisTrackLiked(docs, item.id) ? "red" : "gray"} className="w-8 h-8 laptop:w-12 h-12">
                                        <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                                    </svg>
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