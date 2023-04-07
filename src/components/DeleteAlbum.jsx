import { deleteDoc, doc } from "firebase/firestore"
import { useRef } from "react"
import { useAuthContext } from "../contexts/AuthContext"
import { db } from "../firebase"    
import { toast } from "react-toastify"
import useStreamCollection from "../hooks/useStreamCollection"


const DeleteAlbum = () => {
    const { currentUser } = useAuthContext()
    const {data: collection} = useStreamCollection('albums')

    let thisUsersAlbum
    if(currentUser && collection.loading != false) {
        thisUsersAlbum = collection.filter(album => album.uid === currentUser.uid)
    }
    const ref = useRef()

    const removeAlbum = async (e) => {
        e.preventDefault()
        let deleteThis
        let findTheAlbum = []
        thisUsersAlbum.map((tracks) => {
            findTheAlbum.push(tracks)
        })
        deleteThis = findTheAlbum.filter(title => title.name === ref.current.value)
        if(deleteThis.length !== 0) {
            await deleteDoc(doc(db, 'albums', deleteThis[0].id))
        }else {
            toast.error('No such album exists in your library')
        }
        ref.current.value = ""
    }

    return (
        <>
            {
                (collection) ? 
                <div className="mt-5 mb-[50px] laptop:mb-[20px]">
                    <label className="block mb-2 laptop:text-xl font-body text-GLwhite">Enter album name to delete</label>
                        <div className="flex justify-around">
                            <input type="search" id="default-search" className="block w-full text-m rounded-xl bg-gray-600 text-GLwhite font-extrabold" required ref={ref}/>
                            <button onClick={(e) => (removeAlbum(e))} className="text-GLwhite bg-GLblack hover:bg-gray-700 font-body rounded-lg text-m py-2 px-4 font-extrabold">Delete</button>
                        </div>
                </div> : null
            }
        </>
    )
}

export default DeleteAlbum