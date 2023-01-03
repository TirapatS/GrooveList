import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { deviceWidthState } from '../atoms/global.js'
import LargeDeviceNav from "../components/LargeDeviceNav";
import SearchBar from "../components/SearchBar.jsx";
import SmallDeviceNav from "../components/SmallDeviceNav"

const HomePage = () => {
  const [smallDevice, setSmallDevice] = useState(null)
  const [largeDevice, setLargeDevice] = useState(null)
  const width = useRecoilValue(deviceWidthState)
  
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
            <SearchBar/>
          </div>
        </>

      )}

      { largeDevice && (
        <>
          <div className="flex">
            <LargeDeviceNav/>
            <div className="ml-10">
              <SearchBar/>
            </div>
          </div>
        </>
      )}

      
    </>
  )
}

export default HomePage