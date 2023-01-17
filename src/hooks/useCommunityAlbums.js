import useGetCollection from "./useCollectionData"

const useCommunityAlbums = () => {
    return useGetCollection(`albums`)

}

export default useCommunityAlbums