import { useNavigate } from "react-router-dom"
import { useAuthContext } from "../contexts/AuthContext"
import useFavourites from "../hooks/useFavourites"
import { handleFavourites } from '../utils/handleFavourites'
import { isThisTrackLiked } from "../utils/isThisTrackLiked"


const ScrollList = ({ data }) => {
    const { currentUser } = useAuthContext()
    const [ docs, loading, error ] = useFavourites(currentUser)
    const navigate = useNavigate()

    const navigateToTrack = (track) => {
        if(track.id) {
            sessionStorage.setItem('selectedTrack', track.id)
            navigate(`/track/${track.id}`)
        }else {
            toast.error('There was a problem with getting track')
        }
    }

    return (
        <div className="relative my-5 bg-gray-600 bg-opacity-25 rounded-xl">

            <div id="slider" className="max-h-[120px] laptop:max-h-[320px] overflow-y-auto scroll whitespace-nowrap scroll-smooth scrollbar scrollbar-thumb-gray-600 scrollbar-track-GLblack">  
                {!loading && data.map((item) => {
                    return (
                        <div className="my-3 flex justify-around items-center pr-5 tablet:px-10" key={item.id}>
                                
                            <div onClick={(e) => navigateToTrack(item)}>

                                {
                                    (item.images) ?
                                        <img
                                            className="w-[89px] laptop:w-[120px] inline-block p-2 hover:scale-105 ease-in-out duration-300 rounded-2xl shadow-lg"
                                            src={item.images[0].url}
                                            alt={item.name + 'thumbnail'}
                                        /> 
                                        : 
                                        <img
                                            className="w-[80px] laptop:w-[120px] inline-block p-2 hover:scale-105 ease-in-out duration-300 rounded-2xl shadow-lg"
                                            src={item.album.images[0].url}
                                            alt={item.name + 'thumbnail'}
                                        />
                                }

                            </div>

                                <div className="laptop:w-[200px] w-[80px] content-center">
                                    <p className="text-GLwhite text-m ml-2 truncate font-extrabold">{item.name}</p>
                                    <p className="text-GLwhite text-m ml-2 truncate">{item.artists[0].name}</p>
                                </div>

                           
                                <div className="mt-2" onClick={(e) => handleFavourites(item, currentUser, docs, e)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={isThisTrackLiked(docs, item.id) ? "red" : "gray"} className="w-8 h-8 laptop:w-12 h-12 hover:scale-105 ease-in-out duration-300">
                                        <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                                    </svg>
                                </div>
                        
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ScrollList