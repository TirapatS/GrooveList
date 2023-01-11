import { useRecoilValue } from "recoil"
import { deviceWidthState } from "../atoms/global"
import LargeDeviceNav from "../components/navs/LargeDeviceNav"
import SmallDeviceNav from "../components/navs/SmallDeviceNav"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const AccountPage = () => {
  const [smallDevice, setSmallDevice] = useState(null)
  const [largeDevice, setLargeDevice] = useState(null)
  const width = useRecoilValue(deviceWidthState)
  const navigate = useNavigate()

  const user = false

  useEffect(()=> {
    if(width < 1024) {
      setSmallDevice(width)
    }else {
      setLargeDevice(width)
    }

  }, [])

  return (
    <>
      { smallDevice && (
          <>
              <div>
                  <SmallDeviceNav/>

                  <div className="text-GLwhite font-extrabold mt-[20px]">
                    <h1 className="border-b-2 p-2 text-xl">Account</h1>
                    <div>
                      {
                        (!user) ?
                          <div>
                            <h1 className="border-b-2 mt-2 p-2 text-l">Log In</h1>
                            <h1 className="border-b-2 mt-2 p-2 text-l">Sign In</h1>
                          </div>
                        : 
                          <h1 className="border-b-2 mt-2 p-2 text-l">Log Out</h1>
                      }
                      
                    </div>
                  </div>
              </div>
          </>

      )}

      { largeDevice && (
          <>
              <div className="flex h-screen">
                  <LargeDeviceNav/>

                  <div className="laptop:w-[500px]">
                    
                    <div class="laptop:ml-[100px] laptop:mt-[50px] w-50 h-[300px] text-xl font-body text-gray-900 bg-GLblack rounded-lg border-2 p-5 font-extrabold">
                        <div className="block w-full px-4 py-2 text-GLwhite bg-GLblack rounded-t-lg cursor-pointer">
                            Account
                        </div>
                        {
                          (!user) ? 
                            <div>
                              <button onClick={() => navigate('/login')} className="block mt-5 w-full px-4 py-2  rounded-lg border-b border-gray-200 cursor-pointer hover:bg-gray-600 text-GLwhite">
                              Log In
                              </button>
                              <button onClick={() => navigate('/singup')} className="block mt-5 w-full px-4 py-2  rounded-lg border-b border-gray-200 cursor-pointer hover:bg-gray-600 text-GLwhite">
                                  Sign Up
                              </button>
                            </div>
                            : 
                            <button className="block mt-5 w-full px-4 py-2 rounded-lg border-b border-gray-200 cursor-pointer hover:bg-gray-600 text-GLwhite">
                            Log Out
                            </button>
                        }
                        
                    </div>

                  </div>
              </div>
          </>
      )}
    </>
  )
}

export default AccountPage