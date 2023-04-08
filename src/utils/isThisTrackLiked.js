export const isThisTrackLiked = (docs, id) => {
    let likes = []
    if(docs) {
        docs.map((tracks) => {
            likes.push(tracks.item.id)
        })
    }
    if(likes.includes(id)) {
        return true
    } else {
        return false
    }
}