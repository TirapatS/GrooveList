import { createContext, useContext, useEffect, useState } from 'react'
import { auth, db } from '../firebase'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'

const AuthContext = createContext()

const useAuthContext = () => {
    return useContext(AuthContext)
}

const AuthContextProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState(null)
    const [userName, setUserName] = useState(null)
    const [userEmail, setUserEmail] = useState(null)

    const signup = async (username, email, password) => {
        
        await createUserWithEmailAndPassword(auth, email, password)
       
        const docRef = doc(db, 'users', auth.currentUser.email) 
      
        await setDoc(docRef, {
            username,
            email,
            favourites: [],
            albums: [],
            uid: auth.currentUser.uid
        })
       
    }
    

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logout = () => {
        return signOut(auth)
    }

    // auth-state observer 
	useEffect(() => {
		// listen for auth-state changes
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setCurrentUser(user)
			setUserName(user?.username)
			setUserEmail(user?.email)
		})

		return unsubscribe
	}, [])

    const values = {
        // everything the children needs
        currentUser,
		signup,
        login,
        logout,
		userName,
		userEmail,
    }

    return ( 
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthContextProvider as default,
    useAuthContext
} 