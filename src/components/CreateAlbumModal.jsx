

const CreateAlbumModal = () => {
    return (
        <>
            <button data-modal-target="album-modal" data-modal-toggle="album-modal" className="block bg-gray-700 w-[60px] h-[69px] flex items-center justify-center rounded-xl my-3" type="button">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#f9f9f9" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
            </button>

            <div id="album-modal" tabIndex="-1" aria-hidden="true" className="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full">
                <div className="relative w-full max-w-md md:h-auto">
                    <div className="relative bg-GLblack rounded-lg shadow">
                        <button type="button" className="absolute top-3 right-2.5 text-GLwhite bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-toggle="album-modal">
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        </button>
                        <div className="px-6 py-6 lg:px-8">
                            <h3 className="mb-4 text-xl font-body text-GLwhite">Create an album</h3>
                            <form className="space-y-6" action="#">
                                <div>
                                    <label className="block mb-2 text-sm font-body text-GLwhite">Album Name</label>
                                    <input type="name" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" required/>
                                </div>
                                <div>
                                    {/* TODO put search input here to search after tracks to add  */}
                                </div>
                                
                                <button type="submit" className="w-full text-white bg-gray-600 hover:bg-gray-500 font-body rounded-lg text-sm px-5 py-2.5 text-center">Create album</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div> 
        </>
    )
}

export default CreateAlbumModal