import { useEffect, useState } from "react"
import { useRecoilValue } from "recoil"
import { deviceWidthState } from "../atoms/global"
import CardList from "../components/CardList"
import LargeDeviceNav from "../components/navs/LargeDeviceNav"
import SmallDeviceNav from "../components/navs/SmallDeviceNav"
import SearchBar from "../components/SearchBar"
import SpotifyApi from '../services/spotifyApi'

const ExplorePage = () => {

    const [smallDevice, setSmallDevice] = useState(null)
    const [largeDevice, setLargeDevice] = useState(null)
    const width = useRecoilValue(deviceWidthState)
    const [categories, setCategories] = useState(null)
    
      
    const fetchAllData = async () => {
        const getCategories = await SpotifyApi.getCategories()
        setCategories(getCategories)
    }
      
    useEffect(()=> {
    if(width < 1024) {
        setSmallDevice(width)
    }else {
        setLargeDevice(width)
    }
    
    fetchAllData()
    
    }, [])

    return (
        <>
            { smallDevice && (
                <>
                <div>
                    <SmallDeviceNav/>
                    <SearchBar/>

                    <div className="my-5 mx-2">
                        <h1 className="font-extrabold text-xl">Explore Categories</h1>
                        {
                            (categories) ? <CardList data={categories}/> 
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
                        <SearchBar/>
                        <div className="my-5 mx-2 laptop:w-[500px]">
                            <h1 className="font-extrabold text-xl">Explore Categories</h1>
                            {
                            (categories) ? <CardList data={categories}/> 
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

export default ExplorePage