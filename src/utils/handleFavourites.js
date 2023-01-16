import { deleteDoc, doc, setDoc } from "firebase/firestore"
import { toast } from "react-toastify"
import { db } from "../firebase"
import { isThisTrackLiked } from "./isThisTrackLiked"

export const handleFavourites = async (item, currentUser, docs, e) => {
    e.preventDefault()


    if(!currentUser) {
        toast.error('You must be logged in to use this feature')
        return
    }
    
    const liked = isThisTrackLiked(docs, item.id)
    console.log(liked)

    if(!liked) {
        const docRef = doc(db, `users/${currentUser.email}/favourites`, item.id)
            await setDoc(docRef, {
            item
        })
    } else {
        const docRef = doc(db, `users/${currentUser.email}/favourites`, item.id)
            await deleteDoc(docRef, {
            item
        })
    }
    
}