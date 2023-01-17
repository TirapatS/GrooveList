import { useEffect, useState } from "react"
import { useAuthContext } from "../contexts/AuthContext"
import useFavourites from "../hooks/useFavourites"
import { handleFavourites } from '../utils/handleFavourites'
import { isThisTrackLiked } from "../utils/isThisTrackLiked"

const FavouritesList = ({ data }) => {
    const { currentUser } = useAuthContext()
    const [ docs, loading, error ] = useFavourites(currentUser)

    return (
        <div className="relative my-5 bg-opacity-25 rounded-xl">

            {loading && <h1>Loading...</h1>}

            <div className="max-h-[120px] laptop:max-h-[320px]">  
                {!loading && data.map((item) => {
                    return (
                        <div className="my-3 flex justify-around items-center" key={item.item.id}>
                                
                            {
                                (item.item.images) ?
                                    <img
                                        className="w-[89px] laptop:w-[200px] inline-block p-2 cursor-pointer rounded-2xl"
                                        src={item.item.images[0].url}
                                        alt={item.item.name + 'thumbnail'}
                                    /> 
                                    : 
                                    <img
                                        className="w-[89px] laptop:w-[200px] inline-block p-2 cursor-pointer rounded-2xl"
                                        src={item.item.album.images[0].url}
                                        alt={item.item.name + 'thumbnail'}
                                    />
                            }

                                <div className="laptop:w-[200px] w-[100px] content-center">
                                    <p className="text-GLwhite text-m ml-2 laptop:text-xl truncate font-extrabold">{item.item.name}</p>
                                    <p className="text-GLwhite text-m laptop:text-xl ml-2 truncate">{item.item.artists[0].name}</p>
                                </div>

                        
                                <div className="mt-2" onClick={(e) => handleFavourites(item.item, currentUser, docs, e)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={isThisTrackLiked(docs, item.item.id) ? "red" : "gray"} className="w-8 h-8 laptop:w-12 h-12 hover:scale-105 ease-in-out duration-300 ">
                                        <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                                    </svg>
                                </div>
                        
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default FavouritesList