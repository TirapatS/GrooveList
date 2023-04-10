import { useEffect, useState } from "react"
import { useRecoilValue } from "recoil"
import { deviceWidthState } from "../atoms/global"
import SmallDeviceNav from "../components/navs/SmallDeviceNav"
import LargeDeviceNav from "../components/navs/LargeDeviceNav"
import AnimatedPage from "../components/animations/AnimatedPage"
import { handleFavourites } from "../utils/handleFavourites"
import { isThisTrackLiked } from "../utils/isThisTrackLiked"
import { useAuthContext } from "../contexts/AuthContext"
import useFavourites from "../hooks/useFavourites"
import SpotifyApi from '../services/spotifyApi'


const TrackInfoPage = () => {
    const { currentUser } = useAuthContext()
    const [ docs, loading, error ] = useFavourites(currentUser)
    const [smallDevice, setSmallDevice] = useState(null)
    const [largeDevice, setLargeDevice] = useState(null)
    const width = useRecoilValue(deviceWidthState)
    const [trackInfo, setTrackInfo] = useState(null)
    const [stateLoading, setStateLoading] = useState(true)
    const [trackDuration, setTrackDuration] = useState(null)
    
    const getData = async (id) => {
        const fetchInfo = await SpotifyApi.getMoreInfo(id)
        setTrackInfo(fetchInfo.data)
    }

    const capitalizeWords = (str) => {
        return str
          .toLowerCase()
          .split(' ')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
    };

    useEffect(() => {
        if(width < 1024) {
            setSmallDevice(width)
        }else {
            setLargeDevice(width)
        }
        // Use the ID and call on fetch to spotify
        const id = sessionStorage.getItem('selectedTrack')
        
        if(id) {
            getData(id)
        }
        
    }, [])

    useEffect(() => {
        console.log(trackInfo)
        let minutes
        let seconds
        if(trackInfo) {
            if(trackInfo.tracks) {
                minutes = Math.floor(trackInfo.tracks.items[0].duration_ms / 60000);
                seconds = ((trackInfo.tracks.items[0].duration_ms % 60000) / 1000).toFixed(0);
            }else {
                minutes = Math.floor(trackInfo.duration_ms / 60000);
                seconds = ((trackInfo.duration_ms % 60000) / 1000).toFixed(0);
            }
         
            setTrackDuration(minutes + ":" + (seconds < 10 ? '0' : '') + seconds)
        
            setStateLoading(false)
        }
    }, [trackInfo])

   

    return (
        <AnimatedPage>
            <>
                { smallDevice && (
                    <>
                        <div>
                            <SmallDeviceNav/>

                            {
                                (stateLoading) ? 
                                <div>
                                    <h6>Loading....</h6>
                                </div>
                                : 
                                <div className="my-5 mx-2">

                                    {
                                            (trackInfo.images) ?
                                                <img
                                                    className="w-[200px] laptop:w-[320px] inline-block p-2 rounded-xl"
                                                    src={trackInfo.images[0].url}
                                                    alt={trackInfo.name + 'thumbnail'}
                                                /> 
                                                : 
                                                <img
                                                    className="w-[200px] laptop:w-[320px] inline-block p-2 rounded-xl"
                                                    src={trackInfo.album.images[0].url}
                                                    alt={trackInfo.name + 'thumbnail'}
                                                />
                                        }
                                        <h1 className="font-extrabold text-2xl my-5">{trackInfo.artists[0].name} - {trackInfo.name}</h1>
                                        
                                        <div className="items-center">
                                            <h3 className="font-extrabold my-5">Released: {trackInfo.release_date}</h3>
                                            <h3 className="font-extrabold my-5">Type: {capitalizeWords(trackInfo.album_type)}</h3>
                                            <h3 className="font-extrabold my-5">Duration: {trackDuration}</h3>
                                        </div>

                                        <div className="mt-2" onClick={(e) => handleFavourites(trackInfo, currentUser, docs, e)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={isThisTrackLiked(docs, trackInfo.id) ? "red" : "gray"} className="w-8 h-8 laptop:w-12 h-12 hover:scale-105 ease-in-out duration-300">
                                                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                                            </svg>
                                        </div>
                                
                                </div>
                            }
                        </div>
                    </>

                )}

                { largeDevice && (
                    <>
                        <div className="flex">
                            <LargeDeviceNav/>
                            <div className="mx-5 mt-4">
                                {
                                    (stateLoading) ? 
                                    <div>
                                        <h6>Loading....</h6>
                                    </div>
                                    : 
                                    <div className="my-5 mx-2 laptop:w-[500px]">
                                        {
                                            (trackInfo.images) ?
                                                <img
                                                    className="w-[120px] tablet:w-[200px] laptop:w-[320px] inline-block p-2 rounded-xl"
                                                    src={trackInfo.images[0].url}
                                                    alt={trackInfo.name + 'thumbnail'}
                                                /> 
                                                : 
                                                <img
                                                    className="w-[120px] tablet:w-[200px] laptop:w-[320px] inline-block p-2 rounded-xl"
                                                    src={trackInfo.album.images[0].url}
                                                    alt={trackInfo.name + 'thumbnail'}
                                                />
                                        }
                                        <h1 className="font-extrabold text-2xl my-5">{trackInfo.name}</h1>

                                        <div className="">
                                            <h1 className="font-extrabold text-l my-5">Artists: </h1>
                                            {trackInfo.artists.map((item, idx) => {
                                                return (
                                                    <h1 key={idx} className="font-extrabold text-l my-5 ">{item.name}</h1>
                                                )
                                            })}
                                        </div>
                                        
                                        <div className="items-center">
                                            {
                                                (!trackInfo.album) ? <h3 className="font-extrabold my-5">Released: {trackInfo.release_date}</h3>
                                                : <h3 className="font-extrabold my-5">Released: {trackInfo.album.release_date}</h3>
                                            }
                                            {
                                                (!trackInfo.album) ? <h3 className="font-extrabold my-5">Type: {capitalizeWords(trackInfo.album_type)}</h3>
                                                : <h3 className="font-extrabold my-5">Type: {capitalizeWords(trackInfo.album.album_type)}</h3>
                                            }
                                            <h3 className="font-extrabold my-5">Duration: {trackDuration}</h3>
                                        </div>

                                        <div className="mt-2" onClick={(e) => handleFavourites(trackInfo, currentUser, docs, e)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={isThisTrackLiked(docs, trackInfo.id) ? "red" : "gray"} className="w-8 h-8 tablet:w-10 h-10 laptop:w-12 h-12 hover:scale-105 ease-in-out duration-300">
                                                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                                            </svg>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </>
                )}
            </>
        </AnimatedPage>
    )
}

export default TrackInfoPage