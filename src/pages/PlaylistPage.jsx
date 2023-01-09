import { useRecoilValue } from "recoil"
import { deviceWidthState, selectedCategoryState, selectedPlaylistState } from "../atoms/global"
import LargeDeviceNav from "../components/navs/LargeDeviceNav"
import SmallDeviceNav from "../components/navs/SmallDeviceNav"
import SpotifyApi from '../services/spotifyApi'
import { useEffect, useState } from "react"
import ShowcasePlaylist from "../components/ShowcasePlaylist"
import { useNavigate } from "react-router-dom"

const PlaylistPage = () => {
    const [smallDevice, setSmallDevice] = useState(null)
    const [largeDevice, setLargeDevice] = useState(null)
    const width = useRecoilValue(deviceWidthState)
    const [playlist, setPlaylist] = useState(null)
    const [page, setPage] = useState(0)
    const [title, setTitle] = useState('')
    const navigate = useNavigate()
    
    const selectedPlaylist = useRecoilValue(selectedPlaylistState)
    const selectedCategory = useRecoilValue(selectedCategoryState)

    const fetchAllData = async (selectedPlaylist, page) => {
        if(!selectedPlaylist) {
            navigate(`/explore${selectedCategory}`)
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

    const handleClick = () => {

    }

    useEffect(()=> {
        if(width < 1024) {
          setSmallDevice(width)
        }else {
          setLargeDevice(width)
        }
    
    }, [])

    useEffect(() => {
        fetchAllData(selectedPlaylist, page)
    }, [page])
    

    
    return (
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
                                    <ShowcasePlaylist data={playlist} handleClick={handleClick}/> 
                                </div>
                                : 
                                <div className="text-center">
                                    <h3>There was a problem fetching data 😢</h3>
                                    {/* Visa loading spinner istället */}
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
                        <div className="ml-10 mt-4">
                            <div className="my-5 mx-2 laptop:w-[500px]">
                                <h1 className="font-extrabold text-xl">Explore {title}</h1>
                                {
                                (playlist) ? 
                                <>
                                    <ShowcasePlaylist data={playlist} handleClick={handleClick}/> 
                                </>
                                
                                : 
                                <div className="text-center">
                                    <h3>There was a problem fetching data 😢</h3>
                                    {/* Visa loading spinner istället */}
                                </div>
                                }
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default PlaylistPage