import useGetCollection from "./useCollectionData"

const useCommunityAlbums = () => {
    return useGetCollection(`communityAlbums`)

}

export default useCommunityAlbums