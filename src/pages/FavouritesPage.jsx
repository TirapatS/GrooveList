import { useRecoilValue } from "recoil"
import { deviceWidthState } from "../atoms/global"
import LargeDeviceNav from "../components/navs/LargeDeviceNav"
import SmallDeviceNav from "../components/navs/SmallDeviceNav"
import { useEffect, useState } from "react"
import { useAuthContext } from "../contexts/AuthContext"
import useFavourites from "../hooks/useFavourites"
import FavouritesList from "../components/FavouritesList"

const FavouritesPage = () => {
    const [smallDevice, setSmallDevice] = useState(null)
    const [largeDevice, setLargeDevice] = useState(null)
    const width = useRecoilValue(deviceWidthState)
    
    const { currentUser } = useAuthContext()
    const [ docs, loading, error ] = useFavourites(currentUser)

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
                                (!loading && docs) ? 
                                <FavouritesList data={docs}/>
                                : 
                                <div className="mt-[200px] text-center">
                                    <h1>You have yet added favourite tracks!</h1>
                                </div>
                            }

                            {
                                (!currentUser) ? <h1>You need to be logged in to see your favorites</h1> : null
                            }
                        </div>
                    </div>
                </>
    
            )}
    
            { largeDevice && (
                <>
                    <div className="flex h-screen">
                        <LargeDeviceNav/>
    
                        <div className="laptop:w-full laptop:ml-5">
                            <div className="text-GLwhite font-extrabold mt-[20px]">
                                <h1 className="text-xl">Your Favourites</h1>

                                {
                                    (!loading && docs) ? 
                                    <FavouritesList data={docs}/>
                                    : 
                                    <div className="mt-[200px] text-center">
                                        <h1>You have yet added favourite tracks!</h1>
                                    </div>
                                }

                                {
                                    (!currentUser) ? <h1>You need to be logged in to see your favorites</h1> : null
                                }
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default FavouritesPage