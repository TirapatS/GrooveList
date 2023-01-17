import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const CommunityScrollList = ({ data }) => {
  const navigate = useNavigate()

  const viewAlbumTracks = (album) => {
    sessionStorage.setItem('selectedCommunityAlbum', JSON.stringify(album))
    navigate(`/community/${album.name}`)
  }

    return (
        <div className="relative my-5 bg-gray-600 bg-opacity-25 rounded-xl">
              <div id="slider" className="max-h-[120px] laptop:max-h-[320px] overflow-y-auto scroll whitespace-nowrap scroll-smooth scrollbar scrollbar-thumb-gray-600 scrollbar-track-GLblack">  
                  {data.map((item, idx) => {
                      return (
                          <div className="my-3 flex justify-around items-center" key={idx}>
                                  
                            <img
                              className="w-[89px] laptop:w-[200px] inline-block p-2 hover:scale-105 ease-in-out duration-300 rounded-2xl shadow-lg"
                              src={item.trackList[0].album.images[0].url ? item.trackList[0].album.images[0].url : item.trackList[0].images[0].url}
                              alt={item.name + 'thumbnail'}
                              onClick={(e) => viewAlbumTracks(item, e)}
                            /> 


                            <div className="laptop:w-[200px] w-[100px] content-center">
                              <p className="text-GLwhite text-m ml-2 truncate font-extrabold">{item.name}</p>
                              <p className="text-GLwhite text-m ml-2 truncate">{item.displayName}</p>
                            </div>
                          </div>
                      )
                  })}
              </div>
        </div>
    )
}

export default CommunityScrollList