import { useRecoilValue } from "recoil"
import { deviceWidthState } from "../atoms/global"
import LargeDeviceNav from "../components/navs/LargeDeviceNav"
import SmallDeviceNav from "../components/navs/SmallDeviceNav"
import SpotifyApi from '../services/spotifyApi'
import { useEffect, useState } from "react"
import CardList from "../components/CardList"
import { useNavigate, useParams } from "react-router-dom"

const CategoryPage = () => {
    const [smallDevice, setSmallDevice] = useState(null)
    const [largeDevice, setLargeDevice] = useState(null)
    const width = useRecoilValue(deviceWidthState)
    const [category, setCategory] = useState(null)
    const [next, setNext] = useState(null)
    const [prev, setPrev] = useState(null)
    const [title, setTitle] = useState('')
    const navigate = useNavigate()
    const { id } = useParams()
    

    const fetchAllData = async (selectedCategory) => {

        const getTitle = await SpotifyApi.getCategoryInfo(selectedCategory)
        setTitle(getTitle.data.name)

        if(!selectedCategory) {
            const getCategory = await SpotifyApi.getCategory(selectedCategory)
            setCategory(getCategory.data.playlists)
            setNext(getCategory?.data.next)
            setPrev(getCategory?.data.previous)
        } else {
            const getCategory = await SpotifyApi.getCategory(selectedCategory)
            setCategory(getCategory.data.playlists)
            setNext(getCategory?.data.next)
            setPrev(getCategory?.data.previous)
        }

    }

    const handleClick = (playlist) => {
        navigate(`/playlist/${playlist}`)
    }
      
    useEffect(()=> {
        if(width < 1024) {
          setSmallDevice(width)
        }else {
          setLargeDevice(width)
        }

        fetchAllData(id)
    }, [])
    

    return (
        <>
            { smallDevice && (
                <>
                    <div>
                        <SmallDeviceNav/>

                        <div className="my-5 mx-2">
                            <h1 className="font-extrabold text-xl">Explore {title}</h1>
                            {
                                (category) ? 
                                <div>
                                    <CardList data={category} handleClick={handleClick}/> 
                                </div>
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
                            <div className="my-5 mx-2 laptop:w-[500px]">
                                <h1 className="font-extrabold text-xl">Explore {title}</h1>
                                {
                                (category) ? 
                                <>
                                    <CardList data={category} handleClick={handleClick}/> 
                                    <div className="mb-20">   
                                        <div className="flex flex-col items-center w-[669px]">

                                            <div className="inline-flex mt-2 xs:mt-0">
                                                {
                                                    (prev) ? 
                                                    <button onClick={() => setPage(prevValue => prevValue - 20)} className="inline-flex items-center px-5 py-3 text-sm font-body text-white bg-gray-600 rounded-l bg-opacity-25">
                                                        <svg aria-hidden="true" className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd"></path></svg>
                                                    <h2 className="text-xl">Prev</h2>
                                                    </button> : null
                                                }
                                                {
                                                    (next) ?
                                                    <button onClick={() => setPage(prevValue => prevValue + 20)} className="inline-flex items-center px-5 py-3 text-sm font-body text-white bg-gray-600 border-0 border-l border-gray-700 bg-opacity-25 rounded-r">
                                                        <h2 className="text-xl">Next</h2>
                                                        <svg aria-hidden="true" className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>

                                                    </button>
                                                    : null
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </>
                                
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

export default CategoryPage