import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { deviceWidthState } from '../atoms/global.js'
import LargeDeviceNav from "../components/navs/LargeDeviceNav";
import SearchBar from "../components/SearchBar.jsx";
import SmallDeviceNav from "../components/navs/SmallDeviceNav"
import CardList from "../components/ScrollList.jsx";
import SpotifyApi from '../services/spotifyApi'

const HomePage = () => {
  const [smallDevice, setSmallDevice] = useState(null)
  const [largeDevice, setLargeDevice] = useState(null)
  const width = useRecoilValue(deviceWidthState)
  const [newReleases, setNewReleases] = useState(null)
  // Fetch data from backend
  const community = false;
  
  const fetchAllData = async () => {
    const getNewReleases = await SpotifyApi.getNewRelease()
    setNewReleases(getNewReleases.albums.items)
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
              <h1 className="font-extrabold text-xl">New releases</h1>
              {
                (newReleases) ? <CardList data={newReleases}/> 
                : <div className="text-center">
                    <h3>There was a problem fetching data 😢</h3>
                    {/* Visa loading spinner istället */}
                  </div>
              }
              
            </div>
            <div className="my-5 mx-2">
              <h1 className="font-extrabold text-xl">Community Albums</h1>
              {
                (community) ? <CardList data={community}/> 
                : <div className="text-center">
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
                <h1 className="font-extrabold text-xl">New releases</h1>
                {
                  (newReleases) ? <CardList data={newReleases}/> 
                  : <div className="text-center">
                      <h3>There was a problem fetching data 😢</h3>
                      {/* Visa loading spinner istället */}
                    </div>
                }
                
              </div>
              <div className="my-5 mx-2 w-[500px]">
                <h1 className="font-extrabold text-xl">Community Albums</h1>
                {
                  (community) ? <CardList data={community}/> 
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

export default HomePage