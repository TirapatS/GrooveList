export const isThisTrackLiked = (docs, id) => {
    let likes = []
    docs.map((tracks) => {
        likes = tracks.item.id
    })
    if(likes.includes(id)) {
        return true
    } else {
        return false
    }
}