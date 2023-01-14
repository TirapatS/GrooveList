import { toast } from "react-toastify"
import { useAuthContext } from "../contexts/AuthContext"

const ShowcasePlaylist = ({ data }) => {    

    const { currentUser } = useAuthContext()
    
    let liked = false
    
    const handleFavourite = (item, e) => {
        e.preventDefault()
        if(!currentUser) {
            toast.error('You must be logged in to use this feature')
            return
        }
        console.log(item)
    }

    return (
        <div className="bg-GLblack rounded-lg mb-[100px] laptop:mb-[0px]">
            <div className="grid laptop:grid-rows-4 laptop:grid-flow-col gap-4 grid-rows-6 grid-flow-col p-2 laptop:p-0">
                {data.items.map((item) => {
                    return (
                        <div className="my-3 laptop:w-[120px] w-[69px] h-[200px]" key={item.track.name}>
                            <img className="rounded-lg hover:p-1" src={item.track.album.images?.[0].url} title={item.track.name}/>
                            <div className="font-extrabold">
                                <p className="text-GLwhite my-2 text-m truncate">{item.track.name}</p>
                                <p className="text-GLwhite text-sm truncate">{item.track.album.artists?.[0].name}</p>
                                
                                <div className="mt-2">
                                    {
                                        (!liked) ? 
                                        <div onClick={(e) => handleFavourite(item, e)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="gray" className="w-8 h-8 laptop:w-12 h-12">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                            </svg>
                                        </div>
                                        :
    
                                        <div onClick={(e) => handleFavourite(item, e)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" className="w-8 h-8 laptop:w-12 h-12">
                                                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                                            </svg>
                                        </div>
                                    } 
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ShowcasePlaylist