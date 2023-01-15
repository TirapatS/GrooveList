import useGetCollection from "./useCollectionData"

const useFavourites = (currentUser) => {
    return useGetCollection(`users/${currentUser?.email}/favourites`)

}

export default useFavourites