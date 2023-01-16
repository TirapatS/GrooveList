import { doc, setDoc } from "firebase/firestore"
import { toast } from "react-toastify"
import { db } from "../firebase"

export const SubmitFavourites = async (item, currentUser, e) => {
    e.preventDefault()

    if(!currentUser) {
        toast.error('You must be logged in to use this feature')
        return
    }
    
    const docRef = doc(db, `users/${currentUser.email}/favourites`, item.id)
    await setDoc(docRef, {
        item
    })
}