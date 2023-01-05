

const SearchBar = () => {

  const handleSearch = (e) => {
    e.preventDefault();
  }

  return (
    <form onSubmit={(e) => handleSearch(e)}>   
        <div className="relative laptop:w-[52rem]">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <input type="search" id="default-search" className="block w-full p-4 pl-10 text-sm rounded-xl bg-gray-600" required/>
            <button type="submit" className="text-GLwhite absolute right-2.5 bottom-2.5 bg-GLblack hover:bg-gray-700 font-body rounded-lg text-sm px-4 py-2">Search</button>
        </div>
    </form>
  )
}

export default SearchBar