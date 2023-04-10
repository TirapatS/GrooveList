import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useRecoilValue } from "recoil"
import { deviceWidthState } from "../atoms/global"
import AnimatedPage from "../components/animations/AnimatedPage"
import CardList from "../components/CardList"
import LargeDeviceNav from "../components/navs/LargeDeviceNav"
import SmallDeviceNav from "../components/navs/SmallDeviceNav"
import SpotifyApi from '../services/spotifyApi'

const ExplorePage = () => {

    const [smallDevice, setSmallDevice] = useState(null)
    const [largeDevice, setLargeDevice] = useState(null)
    const width = useRecoilValue(deviceWidthState)
    const [categories, setCategories] = useState(null)
    const [page, setPage] = useState(0)
    const [next, setNext] = useState(null)
    const [prev, setPrev] = useState(null)
    const navigate = useNavigate()
      
    const fetchData = async (page) => {
        if(!page) {
            const getCategories = await SpotifyApi.getCategories(0)
            setCategories(getCategories.categories)
            setNext(getCategories?.categories.next)
            setPrev(getCategories?.categories.previous)
        } else {
            const getCategories = await SpotifyApi.getCategories(page)
            setCategories(getCategories.categories)
            setNext(getCategories?.categories.next)
            setPrev(getCategories?.categories.previous)
        }
        
        sessionStorage.setItem('pageStorage', page)
    }

    const handleClick = (category) => {
        navigate(`/category/${category}`)
    }

    const handlePrev = () => {
        setPage(prevValue => prevValue - 20)
    }

    const handleNext = () => {
        setPage(prevValue => prevValue + 20)
    }
      
    useEffect(()=> {
    if(width < 1024) {
        setSmallDevice(width)
    }else {
        setLargeDevice(width)
    }

    let pageStorage = sessionStorage.getItem('pageStorage')
    if(pageStorage == null) {
        pageStorage = 0
    }

    sessionStorage.setItem('pageStorage', parseInt(pageStorage))
    setPage(parseInt(pageStorage))

    }, [])

    useEffect(() => {
        fetchData(page)
    }, [page])
    
    

    return (
        <AnimatedPage>
            <>
                { smallDevice && (
                    <>
                        <div>
                            <SmallDeviceNav/>

                            <div className="my-5 mx-2">
                                <h1 className="font-extrabold text-xl">Explore Categories</h1>

                                {
                                    (categories) ? 
                                    <div>
                                        <CardList data={categories} handleClick={handleClick}/> 
                                        <div className="mb-20">   
                                            <div className="flex flex-col items-center">
            
                                                <div className="inline-flex mt-2 xs:mt-0">
                                                    {
                                                        (prev) ? 
                                                        <button onClick={() => handlePrev()} className="inline-flex items-center px-4 py-2 text-sm font-body text-white bg-gray-600 rounded-l bg-opacity-25">
                                                            <svg aria-hidden="true" className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd"></path></svg>
                                                        Prev
                                                        </button> : null
                                                    }
                                                    {
                                                        (next) ?
                                                        <button onClick={() => handleNext()} className="inline-flex items-center px-4 py-2 text-sm font-body text-white bg-gray-600 border-0 border-l border-gray-700 bg-opacity-25 rounded-r ">
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
                                        <h3>There was a problem fetching data</h3>
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
                            <div className=" mx-2 tablet:ml-10 mt-4 tablet:w-2/3">
                                <div className="my-5 mx-2 w-[200px] laptop:w-full-screen">
                                    <h1 className="font-extrabold text-xl">Explore Categories</h1>

                                    {
                                    (categories) ? 
                                    <>
                                        <CardList data={categories} handleClick={handleClick}/> 
                                        <div className="mb-20">   
                                            <div className="flex flex-col items-center tablet:w-[669px]">

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
                                        <h3>There was a problem fetching data</h3>
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

export default ExplorePage