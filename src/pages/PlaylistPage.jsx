import { useRecoilValue } from "recoil"
import { deviceWidthState } from "../atoms/global"
import LargeDeviceNav from "../components/navs/LargeDeviceNav"
import SmallDeviceNav from "../components/navs/SmallDeviceNav"
import SpotifyApi from '../services/spotifyApi'
import { useEffect, useState } from "react"
import ShowcasePlaylist from "../components/ShowcasePlaylist"
import { useNavigate, useParams } from "react-router-dom"
import AnimatedPage from "../components/animations/AnimatedPage"



const PlaylistPage = () => {
    const [smallDevice, setSmallDevice] = useState(null)
    const [largeDevice, setLargeDevice] = useState(null)
    const width = useRecoilValue(deviceWidthState)
    const [playlist, setPlaylist] = useState(null)
    const [title, setTitle] = useState('')
    const navigate = useNavigate()
    const { id } = useParams()
    
    const fetchAllData = async (selectedPlaylist, page) => {
        if(!id) {
            navigate(`/explore${id}}`)
            return
        }

        const getTitle = await SpotifyApi.getPlaylistInfo(selectedPlaylist)
        setTitle(getTitle.data.name)

        if(!page) {
            const getPlaylist = await SpotifyApi.getPlaylist(selectedPlaylist, 0)
            setPlaylist(getPlaylist.data)
        } else {
            const getPlaylist = await SpotifyApi.getCategories(selectedPlaylist, page)
            setPlaylist(getPlaylist.data)
        }
    }

    useEffect(()=> {
        if(width < 1024) {
          setSmallDevice(width)
        }else {
          setLargeDevice(width)
        }
    
        fetchAllData(id)
    }, [])

    
    return (
        <AnimatedPage>
            <>
                { smallDevice && (
                    <>
                        <div>
                            <SmallDeviceNav/>

                            <div className="my-5 mx-2">
                                <h1 className="font-extrabold text-2xl">Explore {title}</h1>
                                {
                                    (playlist) ? 
                                    <div>
                                        <ShowcasePlaylist data={playlist}/> 
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
                            <div className="mx-2 tablet:mx-5 mt-4 w-3/4">
                                <div className="tablet:ml-10 mt-4 tablet:w-2/3">
                                    <h1 className="font-extrabold text-xl">Explore {title}</h1>
                                    {
                                    (playlist) ? 
                                    <>
                                        <ShowcasePlaylist data={playlist}/> 
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

export default PlaylistPage