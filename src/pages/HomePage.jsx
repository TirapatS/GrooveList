import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { deviceWidthState } from '../atoms/global.js'
import LargeDeviceNav from "../components/navs/LargeDeviceNav";
import SearchBar from "../components/SearchBar.jsx";
import SmallDeviceNav from "../components/navs/SmallDeviceNav"
import ScrollList from "../components/ScrollList.jsx";
import SpotifyApi from '../services/spotifyApi'
import CommunityScrollList from "../components/CommunityScrollList.jsx";
import useCommunityAlbums from "../hooks/useCommunityAlbums.js";
import AudioPlayer from "../components/audio/AudioPlayer.jsx";
import { songs } from "../songs"
import AnimatedPage from "../components/animations/AnimatedPage.jsx";

const HomePage = () => {
  const [smallDevice, setSmallDevice] = useState(null)
  const [largeDevice, setLargeDevice] = useState(null)
  const width = useRecoilValue(deviceWidthState)
  const [newReleases, setNewReleases] = useState(null)
  const [userSearch, setUserSearch] = useState(null)
  const [search, setSearch] = useState(null)
  const [ docs, loading, error ] = useCommunityAlbums()

  const fetchAllData = async () => {
    const getNewReleases = await SpotifyApi.getNewRelease()
    setNewReleases(getNewReleases.albums.items)
  }

  const searchSubmit = async (search) => {

    if(!search) {
      return 
    } else {
      const res = await SpotifyApi.getSearchRes(search)
      setUserSearch(res.data.tracks.items)
      setSearch(search)
    }
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
    <AnimatedPage>
      <>
        { smallDevice && (
          <>
            <div>
              <SmallDeviceNav/>
              <SearchBar onSubmit={searchSubmit} />

              <div className="my-5 mx-2">
                
                {
                  (userSearch) ? 
                  <>
                    <h1 className="font-extrabold text-xl">Results: {search}</h1>
                      <ScrollList data={userSearch}/> 
                  </>
                  : null
                }

                <h1 className="font-extrabold text-xl">New releases</h1>

                {
                  (newReleases) ? <ScrollList data={newReleases}/> 
                  : <div className="text-center">
                      <h3>There was a problem fetching data</h3>
                    </div>
                }
                
              </div>
              <div className="my-5 mx-2">
                <h1 className="font-extrabold text-xl">Community Albums</h1>
                {
                  (!loading && docs) ? <CommunityScrollList data={docs}/> 
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
              <div className="ml-10 mt-4">
                <SearchBar onSubmit={searchSubmit} />
                <div className="my-5 ml-2 ">
                  {
                    (userSearch) ? 
                    <>
                      <h1 className="font-extrabold text-xl">Results: {search}</h1>
                        <ScrollList data={userSearch}/> 
                    </>
                    : null
                  }

                  <h1 className="font-extrabold text-xl">New releases</h1>

                  {
                    (newReleases) ? <ScrollList data={newReleases}/> 
                    : <div className="text-center">
                        <h3>There was a problem fetching data</h3>
                      </div>
                  }
                  
                </div>
                <div className="my-5 mx-2 laptop:w-4/5 w-[500px]">
                  <h1 className="font-extrabold text-xl">Community Albums</h1>

                  {
                    (!loading && docs) ? <CommunityScrollList data={docs}/> 
                    : <div className="text-center mt-4">
                        <h3>There is no data</h3>
                      </div>
                  }
                </div>
              </div>
            </div>
          </>
        )}
        <div className="laptop:mt-[300px] mt-[400px]">
          <AudioPlayer tracks={songs} />
        </div>
      </>
    </AnimatedPage>
  )
}

export default HomePage