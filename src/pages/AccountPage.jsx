import { useRecoilValue } from "recoil"
import { deviceWidthState } from "../atoms/global"
import LargeDeviceNav from "../components/navs/LargeDeviceNav"
import SmallDeviceNav from "../components/navs/SmallDeviceNav"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthContext } from "../contexts/AuthContext"
import useUsers from '../hooks/useUsers'

const AccountPage = () => {
  const [smallDevice, setSmallDevice] = useState(null)
  const [largeDevice, setLargeDevice] = useState(null)
  const [showName, setShowName] = useState('')
  const width = useRecoilValue(deviceWidthState)
  const navigate = useNavigate()
  const { currentUser, userEmail, displayName, logout} = useAuthContext()

  const { data: users, } = useUsers('users')
  
  const GLmember = users.filter(i => i.GLmember === true)
  
  let thisUser
  if (currentUser) {
    thisUser = GLmember.filter(user => user.email === currentUser.email)
    
  }
  const logoutUser = async () => {
    await logout()
    navigate('/')
  }

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
                    <h1 className="p-2 text-xl underline">Account</h1>
                    <div className="ml-1 p-2">
                      {
                        (thisUser) ? 
                          <div>
                            <h1 className="my-5 border-b-2">Username: {displayName}</h1>
                            <h1 className="border-b-2">Email: {userEmail}</h1>
                          </div> : null
                      }
                    </div>
                    <div>
                      {
                        (!currentUser) ?
                          <div className="flex justify-around mt-3">
                            <button className="border-b-2 mt-2 p-2 text-l">Log In</button>
                            <button className="border-b-2 mt-2 p-2 text-l">Sign In</button>
                          </div>
                        : 
                          <div className="flex justify-center mt-3">
                            <button onClick={() => logoutUser()} className="border-b-2 mt-2 p-2 text-l">Log Out</button>
                          </div>
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
                    
                    <div className="ml-[100px] mt-[50px] w-50 h-[500px] text-xl font-body text-gray-900 bg-GLblack rounded-lg border-2 p-5 font-extrabold">
                        <div className="block w-full px-4 py-2 text-GLwhite bg-GLblack rounded-t-lg cursor-pointer">
                          <h1 className="p-2 text-2xl underline">Account</h1>
                        </div>
                        <div className="ml-1 p-2">
                          {
                            (thisUser) ? 
                              <div>
                                <h1 className="my-5 border-b-2">Username: {displayName}</h1>
                                <h1 className="border-b-2">Email: {userEmail}</h1>
                              </div> : null
                          }
                        </div>
                        {
                          (!currentUser) ? 
                            <div>
                              <button onClick={() => navigate('/login')} className="block mt-5 w-full px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-600 text-GLwhite">
                                <h1>Log In</h1>
                              </button>
                              <button onClick={() => navigate('/singup')} className="block mt-5 w-full px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-600 text-GLwhite">
                                <h1>Sign Up</h1>
                              </button>
                            </div>
                            : 
                            <button onClick={() => logoutUser()} className="block mt-5 w-full px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-600 text-GLwhite">
                              <h1>Log Out</h1>
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