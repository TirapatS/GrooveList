import { addDoc, collection, doc, setDoc } from "firebase/firestore"
import { useRef, useState } from "react"
import { toast } from "react-toastify"
import { useAuthContext } from "../contexts/AuthContext"
import { auth, db } from "../firebase"
import SpotifyApi from '../services/spotifyApi'


const CreateAlbumModal = () => {

    const { currentUser } = useAuthContext()
    const [trackSearch, setTrackSearch] = useState(null)
    const [initiateCreateAlbumForm, setInitiateCreateAlbumForm] = useState(false)
    const [stateLoading, setStateLoading] = useState(false)

    /* List of tracks to be added */
    const [addTrack, setAddTrack] = useState([])

    /* Name of the album */
    const [albumName, setAlbumName] = useState(null)
   

    const nameRef = useRef()
    const searchRef = useRef()

    const nameSubmit = () => {
        if(nameRef.current.value.length < 3) {
            toast.error('Album name too short')
            return
        }
        setAlbumName(nameRef.current.value)
    }

    const searchSubmit = async (e) => {

        setStateLoading(true)
        if(!searchRef.current.value) {
            setStateLoading(false)
            toast.error('Please enter your search')
            return 
        } else {
            const res = await SpotifyApi.getSearchRes(searchRef.current.value)
            setTrackSearch(res.data.tracks.items)
            setStateLoading(false)
        }
    }

    const addToAlbum = (track, e) => {
        e.preventDefault()

        let tracks = []
        addTrack.map((item) => {
            tracks.push(item.id)
        })

        if(tracks.includes(track.id)) {
            toast.error('This track has already been added')
            return
        } else {
            setAddTrack(currentData => [...currentData, track])
        }
    }
    

    const removeFromAlbum = (track, e) => {
        e.preventDefault()
        let array = [...addTrack]
        let index = array.indexOf(track)
        if(index !== -1) {
            array.splice(index, 1)
            setAddTrack(array)
        }
    }

    const addNewAlbum = async (e) => {
        e.preventDefault()

        if(!albumName || addTrack.length == 0) {
            toast.error('Enter a valid name and tracks/songs')
            return
        }
        
        await addDoc(collection(db, 'albums'), {
            trackList: addTrack,
            name: albumName,
            uid: auth.currentUser.uid,
            displayName: auth.currentUser.displayName
        })

        toast.success('Album created!')

        setAddTrack([])
        setTrackSearch(null)
        setAlbumName(null)
        setInitiateCreateAlbumForm(false)
    }

    const cancelForm = () => {
        setAddTrack([])
        setTrackSearch(null)
        setAlbumName(null)
        setInitiateCreateAlbumForm(false)
    }
        
    const checkUser = (e) => {
        e.preventDefault()
        if(!currentUser) {
            toast.error('You must be logged in to use this feature')
            return
        }else {
            setInitiateCreateAlbumForm(true)
        }
    }

    return (
       <div className="mt-5 mb-[50px]">
            {
                (initiateCreateAlbumForm) ?
                    <>
                        <h1 className="mb-5 font-extrabold laptop:text-2xl text-xl">Fill out the form to create a new album</h1>
                        <div>
                            <label className="block mb-2 laptop:text-xl font-body text-GLwhite">Name Your Album: </label>
                            <div className="flex">
                                <input type="text" className="block w-full p-2 text-GLblack rounded-lg bg-GLwhite text-m font-extrabold" ref={nameRef}></input>
                                <button onClick={(e) => (nameSubmit(e))} className="text-GLwhite bg-GLblack hover:bg-gray-700 font-body rounded-lg text-m py-2 px-4 font-extrabold">Submit</button>
                            </div>
                        </div>

                        {
                            (albumName) ? 
                            
                            <div className="mt-5">
                                <label className="block mb-2 laptop:text-xl font-body text-GLwhite">Search for tracks to add </label>
                                <div className="flex">
                                    <input type="search" id="default-search" className="block w-full text-m rounded-xl bg-GLwhite text-GLblack font-extrabold" required ref={searchRef}/>
                                    <button onClick={(e) => (searchSubmit(e))} className="text-GLwhite bg-GLblack hover:bg-gray-700 font-body rounded-lg text-m py-2 px-4 font-extrabold">Search</button>
                                </div>
                            </div>

                            : null
                        }

                        <div className="relative my-5 bg-gray-600 bg-opacity-25 rounded-xl">

                            {stateLoading && <h1 className="text-m p-4 rounded-lg">Loading...</h1>}

                            <div id="slider" className="max-h-[320px] laptop:max-h-[320px] overflow-y-auto scroll whitespace-nowrap scroll-smooth scrollbar scrollbar-thumb-gray-600 scrollbar-track-GLblack">  
                                {!stateLoading && trackSearch && trackSearch.map((item) => {
                                    return (
                                        <div className="my-3 flex justify-around items-center" key={item.id}>
                                                
                                            {
                                                (item.images) ?
                                                    <img
                                                        className="w-[89px] laptop:w-[100px] inline-block p-2 hover:scale-105 ease-in-out duration-300 rounded-2xl"
                                                        src={item.images[0].url}
                                                        alt={item.name + 'thumbnail'}
                                                    /> 
                                                    : 
                                                    <img
                                                        className="w-[89px] laptop:w-[100px] inline-block p-2 hover:scale-105 ease-in-out duration-300 rounded-2xl"
                                                        src={item.album.images[0].url}
                                                        alt={item.name + 'thumbnail'}
                                                    />
                                            }

                                                <div className="laptop:w-[100px] w-[100px] content-center">
                                                    <p className="text-GLwhite text-m ml-2 truncate font-extrabold">{item.name}</p>
                                                    <p className="text-GLwhite text-m ml-2 truncate">{item.artists[0].name}</p>
                                                </div>

                                                <div className="mt-2">
                                                    <button onClick={(e) => addToAlbum(item, e)} className="text-GLwhite text-m font-extrabold py-2 px-3 rounded-lg hover:scale-105 ease-in-out duration-300 bg-gray-600">Add</button>
                                                </div>
                                        
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                       

                        {
                            (addTrack.length >= 1) ? <h1 className="text-m font-extrabold">Chosen tracks</h1> : null
                        }

                        <div className="relative my-5 bg-gray-600 bg-opacity-25 rounded-xl">

                            <div id="slider">  
                                {!stateLoading && addTrack.map((item) => {
                                    return (
                                        <div className="my-3 flex justify-around items-center" key={item.id}>
                                                
                                            {
                                                (item.images) ?
                                                    <img
                                                        className="w-[89px] laptop:w-[100px] inline-block p-2 hover:scale-105 ease-in-out duration-300 rounded-2xl"
                                                        src={item.images[0].url}
                                                        alt={item.name + 'thumbnail'}
                                                    /> 
                                                    : 
                                                    <img
                                                        className="w-[89px] laptop:w-[100px] inline-block p-2 hover:scale-105 ease-in-out duration-300 rounded-2xl"
                                                        src={item.album.images[0].url}
                                                        alt={item.name + 'thumbnail'}
                                                    />
                                            }

                                                <div className="laptop:w-[100px] w-[100px] content-center">
                                                    <p className="text-GLwhite text-m ml-2 truncate font-extrabold">{item.name}</p>
                                                    <p className="text-GLwhite text-m ml-2 truncate">{item.artists[0].name}</p>
                                                </div>

                                        
                                                <div className="mt-2">
                                                    <button onClick={(e) => removeFromAlbum(item, e)} className="text-GLwhite text-m font-extrabold py-2 px-3 rounded-lg hover:scale-105 ease-in-out duration-300 bg-gray-600 ">Remove</button>
                                                </div>
                                        
                                        </div>
                                    )
                                })}
                            </div>
                            </div>

                        <div className="flex justify-around mt-5">
                            
                            {
                                (addTrack.length >= 1) ? <button onClick={(e) => addNewAlbum(e)} className="text-GLwhite text-m font-extrabold p-3 bg-gray-600 rounded-xl hover:scale-105 ease-in-out duration-300">Create album</button> : null
                            }

                            <button onClick={(e) => cancelForm()} className="text-GLwhite text-m font-extrabold p-3 bg-gray-600 rounded-xl hover:scale-105 ease-in-out duration-300">Cancel</button>
                        </div>
                    
                    </>
                :
                <div onClick={(e) => checkUser(e)} className="block bg-gray-700 w-[60px] h-[69px] flex items-center justify-center rounded-xl my-3 hover:scale-105 ease-in-out duration-300" >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#f9f9f9" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </div>
            }
       </div>
    )
}

export default CreateAlbumModal