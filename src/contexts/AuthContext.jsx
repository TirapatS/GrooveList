import { createContext, useContext } from 'react'
import { auth } from '../firebase'

const AuthContext = createContext()

const useAuthContext = () => {
    return useContext(AuthContext)
}

const AuthContextProvider = ({ children }) => {

    const signup = (username, email, password) => {
        
    }

    return ( 
        <AuthContext.Provider value>
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthContextProvider as default,
    useAuthContext,
} 