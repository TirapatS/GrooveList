import { useAuthContext } from "../contexts/AuthContext"
import useFavourites from "../hooks/useFavourites"
import { isThisTrackLiked } from "../utils/isThisTrackLiked"
import { handleFavourites } from "../utils/handleFavourites"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const ShowcasePlaylist = ({ data }) => {    

    const { currentUser } = useAuthContext()
    const [ docs, loading, error ] = useFavourites(currentUser)  

    const navigate = useNavigate()

    const navigateToTrack = (track) => {
        console.log(track)
        if(track.id) {
            sessionStorage.setItem('selectedTrack', track.id)
            navigate(`/track/${track.id}`)
        }else {
            toast.error('There was a problem')
        }
    }
      

    return (
        <div className="bg-GLblack rounded-lg mb-[100px] laptop:mb-[0px]">

            {loading && <h1>Loading...</h1>}

            <div className="grid grid-rows-8 tablet:grid-rows-4 grid-flow-col gap-4 laptop:p-0 p-2 ">
                {!loading && data.items.map((item) => {
                    return (
                        <div className="my-3 laptop:w-[120px] tablet:w-[69px] w-[59px] h-[200px]" key={item.track.name} onClick={(e) => navigateToTrack(item.track.album)}>
                            <img className="rounded-lg hover:p-1" src={item.track.album.images?.[0].url} title={item.track.name}/>
                            <div className="font-extrabold">
                                <p className="text-GLwhite my-2 text-m truncate">{item.track.name}</p>
                                <p className="text-GLwhite text-sm truncate">{item.track.album.artists?.[0].name}</p>
                                
                                <div className="mt-2" onClick={(e) => handleFavourites(item.track.album, currentUser, docs, e)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={isThisTrackLiked(docs, item.track.album.id) ? "red" : "gray"} className="w-8 h-8 laptop:w-12 h-12 hover:scale-105 ease-in-out duration-300">
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