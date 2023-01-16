import { useRecoilValue } from "recoil"
import { deviceWidthState } from "../atoms/global"
import LargeDeviceNav from "../components/navs/LargeDeviceNav"
import SmallDeviceNav from "../components/navs/SmallDeviceNav"
import ScrollList from '../components/ScrollList'
import { useEffect, useState } from "react"
import { useAuthContext } from "../contexts/AuthContext"
import useFavourites from "../hooks/useFavourites"

const FavouritesPage = () => {
    const [smallDevice, setSmallDevice] = useState(null)
    const [largeDevice, setLargeDevice] = useState(null)
    const width = useRecoilValue(deviceWidthState)
    
    const { currentUser } = useAuthContext()
    const [ docs, loading, error ] = useFavourites(currentUser)
    let data

    if(docs.length > 1) {
        data = docs
    }

    

    useEffect(()=> {
        if(width < 1024) {
          setSmallDevice(width)
        }else {
          setLargeDevice(width)
        }
    
    }, [])

    return (
        <>
            { smallDevice && (
                <>
                    <div>
                        <SmallDeviceNav/>
    
                        <div className="text-GLwhite font-extrabold mt-[20px]">
                            <h1 className="text-xl">Your Favourites</h1>

                            {
                                (data) ? 
                                <ScrollList data={data}/>
                                : 
                                <div className="mt-[200px] text-center">
                                    <h1>You need to be logged in to see your favorites</h1>
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
    
                        <div className="laptop:w-[500px]">
                        
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default FavouritesPage