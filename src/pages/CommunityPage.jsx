import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { deviceWidthState } from '../atoms/global.js'
import CreateAlbum from "../components/CreateAlbum.jsx";
import LargeDeviceNav from "../components/navs/LargeDeviceNav";
import SmallDeviceNav from "../components/navs/SmallDeviceNav"
import CommunityScrollList from "../components/CommunityScrollList.jsx";
import useCommunityAlbums from "../hooks/useCommunityAlbums.js";
import { useAuthContext } from "../contexts/AuthContext.jsx";
import DeleteAlbum from "../components/DeleteAlbum.jsx";
import AnimatedPage from "../components/animations/AnimatedPage.jsx";


const CommunityPage = () => {
  const [smallDevice, setSmallDevice] = useState(null)
  const [largeDevice, setLargeDevice] = useState(null)
  const width = useRecoilValue(deviceWidthState)
  const [ docs, loading] = useCommunityAlbums()
  const { currentUser } = useAuthContext()
  
  let thisUsersAlbum
  if(!loading && docs && currentUser) {
    thisUsersAlbum = docs.filter(user => user.uid === currentUser.uid)
  }

  useEffect(()=> {
    if(width < 1024) {
      setSmallDevice(width)
    }else {
      setLargeDevice(width)
    }

  }, [])

  return (
    <AnimatedPage>
      <>
        { smallDevice && (
          <>
            <div>
              <SmallDeviceNav/>
              <div className="my-5 mx-2">

                <h1 className="font-extrabold text-xl"> Your albums</h1>
                  <CreateAlbum/>
                  
                  {
                    (thisUsersAlbum) ? 
                    <>
                      <CommunityScrollList data={thisUsersAlbum}/> 
                      <DeleteAlbum/>
                    </>
                    : <div className="text-center mb-[100px]">
                        <h3>No data to be shown</h3>
                      </div>
                  }

                <h1 className="font-extrabold text-xl">Explore Community Albums</h1>
                  {
                    (docs) ? <CommunityScrollList data={docs}/> 
                    : <div className="text-center">
                        <h3>No data to be shown</h3>
                      </div>
                  }
              </div>
            </div>
          </>

        )}

        { largeDevice && (
          <>
            <div className="flex h-full-screen">
              <LargeDeviceNav/>
              <div className="tablet:mx-6 mt-4">
                <div className="my-5 mx-2 tablet:w-[500px] laptop:w-[700px]">
                  <h1 className="font-extrabold text-xl"> Your albums</h1>
                    <CreateAlbum/>
                    
                    {
                      (thisUsersAlbum) ? 
                      <>
                        <CommunityScrollList data={thisUsersAlbum}/> 
                        <DeleteAlbum/>
                      </>
                      : <div className="text-center mb-[100px]">
                          <h3>No data to be shown</h3>
                        </div>
                    }

                  <h1 className="font-extrabold text-xl mt-[69px]">Explore Community Albums</h1>
                  {
                    (docs) ? <CommunityScrollList data={docs}/> 
                    : <div className="text-center mt-4">
                        <h3>There is no data</h3>
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

export default CommunityPage