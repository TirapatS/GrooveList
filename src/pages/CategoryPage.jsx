import { useRecoilValue } from "recoil"
import { deviceWidthState } from "../atoms/global"
import LargeDeviceNav from "../components/navs/LargeDeviceNav"
import SmallDeviceNav from "../components/navs/SmallDeviceNav"
import SpotifyApi from '../services/spotifyApi'
import { useEffect, useState } from "react"
import CardList from "../components/CardList"
import { useNavigate, useParams } from "react-router-dom"

const CategoryPage = () => {
    const [smallDevice, setSmallDevice] = useState(null)
    const [largeDevice, setLargeDevice] = useState(null)
    const width = useRecoilValue(deviceWidthState)
    const [category, setCategory] = useState(null)
    const [title, setTitle] = useState('')
    const navigate = useNavigate()
    const { id } = useParams()
    

    const fetchAllData = async (selectedCategory) => {
        const getTitle = await SpotifyApi.getCategoryInfo(selectedCategory)
        setTitle(getTitle.data.name)

        if(!selectedCategory) {
            const getCategory = await SpotifyApi.getCategory(selectedCategory)
            setCategory(getCategory.data.playlists)
        } else {
            const getCategory = await SpotifyApi.getCategory(selectedCategory)
            setCategory(getCategory.data.playlists)
        }
    }

    const handleClick = (playlist) => {
        navigate(`/playlist/${playlist}`)
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
        <>
            { smallDevice && (
                <>
                    <div>
                        <SmallDeviceNav/>

                        <div className="my-5 mx-2">
                            <h1 className="font-extrabold text-xl">Explore {title}</h1>

                            {
                                (category) ? 
                                <div className="mb-20">
                                    <CardList data={category} handleClick={handleClick}/>
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
                    <div className="flex h-screen">
                        <LargeDeviceNav/>
                        <div className="ml-10 mt-4">
                            <div className="my-5 mx-2 laptop:w-full-screen">
                                <h1 className="font-extrabold text-xl">Explore {title}</h1>

                                {
                                (category) ? 
                                <div className="mb-20">
                                    <CardList data={category} handleClick={handleClick}/> 
                                </div>
                                
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
    )
}

export default CategoryPage