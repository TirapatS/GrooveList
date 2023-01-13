import { useRecoilValue } from "recoil"
import { deviceWidthState } from "../atoms/global"
import LargeDeviceNav from "../components/navs/LargeDeviceNav"
import SmallDeviceNav from "../components/navs/SmallDeviceNav"
import ScrollList from '../components/ScrollList'
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthContext } from "../contexts/AuthContext"
import useUsers from '../hooks/useUsers'

const FavouritesPage = () => {
    const [smallDevice, setSmallDevice] = useState(null)
    const [largeDevice, setLargeDevice] = useState(null)
    const width = useRecoilValue(deviceWidthState)
    const navigate = useNavigate()
    const { currentUser, userEmail} = useAuthContext()

    const { data: users, } = useUsers('users')
  
    const GLmember = users.filter(i => i.GLmember === true)
    
    let thisUser
    if (currentUser) {
        thisUser = GLmember.filter(user => user.email === currentUser.email)
        
    }

    let data = false;

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
                                : null
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