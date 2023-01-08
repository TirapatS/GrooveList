import { useRecoilValue } from "recoil"
import { deviceWidthState, selectedCategoryState } from "../atoms/global"
import LargeDeviceNav from "../components/navs/LargeDeviceNav"
import SmallDeviceNav from "../components/navs/SmallDeviceNav"
import SpotifyApi from '../services/spotifyApi'
import { useEffect, useState } from "react"
import CardList from "../components/CardList"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const AlbumPage = () => {
    const [smallDevice, setSmallDevice] = useState(null)
    const [largeDevice, setLargeDevice] = useState(null)
    const width = useRecoilValue(deviceWidthState)
    const [category, setCategory] = useState(null)
    const [page, setPage] = useState(0)
    const [next, setNext] = useState(null)
    const [prev, setPrev] = useState(null)
    const navigate = useNavigate()

    const selectedCategory = useRecoilValue(selectedCategoryState)

    const fetchAllData = async (selectedCategory, page) => {
        if(!selectedCategory) {
            navigate('/explore')
        }
        const getCategory = await SpotifyApi.getCategory(selectedCategory, page)
        setCategory(getCategory.data.playlists)
        console.log("data",getCategory.data.playlists)

        if(!page) {
            const getCategories = await SpotifyApi.getCategories(0)
            setCategory(getCategory.data.playlists)
            setNext(getCategory?.data.next)
            setPrev(getCategory?.data.previous)
        } else {
            const getCategories = await SpotifyApi.getCategories(page)
            setCategory(getCategory.data.playlists)
            setNext(getCategory?.data.next)
            setPrev(getCategory?.data.previous)
        }
    }
      
    useEffect(()=> {
        if(width < 1024) {
          setSmallDevice(width)
        }else {
          setLargeDevice(width)
        }
    
    }, [])

    useEffect(() => {
        fetchAllData(selectedCategory, page)
    }, [page])
    

    return (
        <>
            { smallDevice && (
                <>
                    <div>
                        <SmallDeviceNav/>

                        <div className="my-5 mx-2">
                            <h1 className="font-extrabold text-xl">Explore Category's Playlists</h1>
                            {
                                (category) ? 
                                <div>
                                    <CardList data={category}/> 
                                    <div className="mb-20">   
                                        <div className="flex flex-col ">
                                            <div className="inline-flex mt-2 xs:mt-0">
                                                {
                                                    (prev) ? 
                                                    <button onClick={() => setPage(prevValue => prevValue - 20)} className="inline-flex items-center px-4 py-2 text-sm font-body text-white bg-gray-600 rounded-l bg-opacity-25">
                                                        <svg aria-hidden="true" className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd"></path></svg>
                                                    Prev
                                                    </button> : null
                                                }
                                                {
                                                    (next) ?
                                                    <button onClick={() => setPage(prevValue => prevValue + 20)} className="inline-flex items-center px-4 py-2 text-sm font-body text-white bg-gray-600 border-0 border-l border-gray-700 bg-opacity-25 rounded-r ">
                                                        Next
                                                        <svg aria-hidden="true" className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                                    </button>
                                                    : null
                                                }
                                            </div>
                                        </div>
                                    </div>
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
                                <h1 className="font-extrabold text-xl">Explore Category's Playlists</h1>
                                {
                                (category) ? 
                                <>
                                    <CardList data={category}/> 
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

export default AlbumPage