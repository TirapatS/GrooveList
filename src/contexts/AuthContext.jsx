import { createContext, useContext, useEffect, useState } from 'react'
import { auth, db } from '../firebase'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'

const AuthContext = createContext()

const useAuthContext = () => {
    return useContext(AuthContext)
}

const AuthContextProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState(null)
    const [displayName, setDisplayName] = useState(null)
    const [userEmail, setUserEmail] = useState(null)

    const signup = async (name, email, password) => {

        await createUserWithEmailAndPassword(auth, email, password)
       
        const docRef = doc(db, 'users', auth.currentUser.email) 

        await handleDisplayName(name)

		await reloadUser()
      
        await setDoc(docRef, {
            name,
            email,
            uid: auth.currentUser.uid,
            GLmember: true
        })
       
    }
    

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logout = () => {
        return signOut(auth)
    }

    const handleDisplayName = async (displayName) => {
        return updateProfile(auth.currentUser, {
            displayName
        })
    }

    const reloadUser = async () => {
		await auth.currentUser.reload()
		setCurrentUser(auth.currentUser)
		setDisplayName(auth.currentUser.displayName)
		setUserEmail(auth.currentUser.email)
		return true
	}

    useEffect(() => {
		// listen for auth-state changes
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setCurrentUser(user)
			setDisplayName(user?.displayName)
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
		displayName,
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