import { useNavigate } from "react-router"

const LandingPage = () => {

  const navigate = useNavigate()

  return (
    <>
      <div className="container mx-auto">
        <h1 className="text-center text-5xl laptop:text-7xl mt-40">GROOVELIST</h1>

        <div className="text-center mt-10 grid place-items-center">
          {/* Continue as guest button */}
          <button onClick={() => navigate('/home')} type="button" className="text-GLwhite bg-GLblack hover:bg-gray-500 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-md px-5 py-2.5 mb-5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          >Continue as guest</button>


          {/* Sign up button */}
          <button onClick={() => navigate('/signup')} className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-md px-5 py-2.5 text-center mb-5">
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Sign up
            </span>
          </button>

          {/* Log In button */}
          <button onClick={() => navigate('/login')} className="text-white bg-gradient-to-br from-blue-500 to-purple-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-md px-5 py-2.5 text-center">
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Log In
            </span>
          </button>
        </div>
      </div>
    </>
  )
}

export default LandingPage