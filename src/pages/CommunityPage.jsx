import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { deviceWidthState } from '../atoms/global.js'
import CreateAlbum from "../components/CreateAlbum.jsx";
import LargeDeviceNav from "../components/navs/LargeDeviceNav";
import SmallDeviceNav from "../components/navs/SmallDeviceNav"
import ScrollList from "../components/ScrollList.jsx";


const CommunityPage = () => {
  const [smallDevice, setSmallDevice] = useState(null)
  const [largeDevice, setLargeDevice] = useState(null)
  const width = useRecoilValue(deviceWidthState)
  const [community, setCommunity] = useState(null)
    
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
            <div className="my-5 mx-2">

              <h1 className="font-extrabold text-xl"> Your albums</h1>
                <CreateAlbum/>
                
                {
                  (community) ? <ScrollList data={community}/> 
                  : <div className="text-center mb-[100px]">
                      <h3>No data to be shown 😢</h3>
                      {/* Visa loading spinner istället TODO */}
                    </div>
                }

              <h1 className="font-extrabold text-xl">Explore Community Albums</h1>
                {
                  (community) ? <ScrollList data={community}/> 
                  : <div className="text-center">
                      <h3>No data to be shown 😢</h3>
                      {/* Visa loading spinner istället */}
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
              <div className="my-5 mx-2 w-[500px]">
                <h1 className="font-extrabold text-xl"> Your albums</h1>
                  <CreateAlbum/>
                  
                  {
                    (community) ? <ScrollList data={community}/> 
                    : <div className="text-center mb-[100px]">
                        <h3>No data to be shown 😢</h3>
                        {/* Visa loading spinner istället */}
                      </div>
                  }

                <h1 className="font-extrabold text-xl">Explore Community Albums</h1>
                {
                  (community) ? <ScrollList data={community}/> 
                  : <div className="text-center mt-4">
                      <h3>There is no data 😢</h3>
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

export default CommunityPage