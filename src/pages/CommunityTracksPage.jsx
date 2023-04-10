import { useEffect, useState } from "react"
import { useRecoilValue } from "recoil";
import { deviceWidthState } from '../atoms/global.js'
import AnimatedPage from "../components/animations/AnimatedPage.jsx";
import CommunityTracksList from "../components/CommunityTracksList.jsx";
import LargeDeviceNav from "../components/navs/LargeDeviceNav";
import SmallDeviceNav from "../components/navs/SmallDeviceNav"


const CommunityTracksPage = () => {
    const [smallDevice, setSmallDevice] = useState(null)
    const [largeDevice, setLargeDevice] = useState(null)
    const width = useRecoilValue(deviceWidthState)
    const [playlist, setPlaylist] = useState(null)

    useEffect(() => {
        if(width < 1024) {
            setSmallDevice(width)
        }else {
            setLargeDevice(width)
        }

        const album = sessionStorage.getItem('selectedCommunityAlbum')
    
        setPlaylist(JSON.parse(album))
    }, [])

    return (
        <AnimatedPage>
            <>
                { smallDevice && (
                    <>
                        <div>
                            <SmallDeviceNav/>

                            <div className="my-5 mx-2">
                                <h1 className="font-extrabold text-2xl">Explore {playlist.name} by {playlist.displayName}</h1>
                                {
                                    (playlist) ? 
                                    <div>
                                        <CommunityTracksList data={playlist.trackList}/> 
                                    </div>
                                    : 
                                    <div className="text-center">
                                        <h3>There was a problem fetching data</h3>
                                    </div>
                                }
                            </div>
                        </div>
                    </>

                )}

                { largeDevice && (
                    <>
                        <div className="flex">
                            <LargeDeviceNav/>
                            <div className="mx-2 tablet:mx-6 mt-4">
                                <div className="my-5 mx-2 laptop:w-[500px]">
                                    <h1 className="font-extrabold text-xl">Explore {playlist.name} by {playlist.displayName}</h1>
                                    {
                                    (playlist) ? 
                                    <>
                                        <CommunityTracksList data={playlist.trackList}/> 
                                    </>
                                    
                                    : 
                                    <div className="text-center">
                                        <h3>There was a problem fetching data</h3>
                                    </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </>
        </AnimatedPage>
    )
}

export default CommunityTracksPage