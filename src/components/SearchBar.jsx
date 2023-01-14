import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";


const SearchBar = ({ onSubmit }) => {

  const [searchParams, setSearchParams] = useSearchParams()
  const search = searchParams.get('search')
  const ref = useRef()

  const handleSearch = (e) => {
    e.preventDefault();

    if(!ref.current.value) {
      return
    }

    onSubmit(ref.current.value)
    setSearchParams({ search: ref.current.value })
  }

  useEffect(() => {
    onSubmit(search)
  }, [search])

  return (
    <form onSubmit={handleSearch}>   
        <div className="relative laptop:w-[52rem]">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <input type="search" id="default-search" className="block w-full p-4 pl-10 text-m rounded-xl bg-gray-600 text-GLwhite font-extrabold" required ref={ref}/>
            <button type="submit" className="text-GLwhite absolute right-2.5 bottom-2.5 bg-GLblack hover:bg-gray-700 font-body rounded-lg text-sm px-4 py-2 font-extrabold">Search</button>
        </div>
    </form>
  )
}

export default SearchBar