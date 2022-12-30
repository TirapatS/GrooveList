import { useState, useEffect } from 'react'
import { db } from '../firebase'
import {collection, onSnapshot, query} from 'firebase/firestore'

const useStreamCollection = (coll, ...queryConstraints) => {
    const [data, setData] = useState([])

    useEffect(()=> {
        // get ref to collection
        const ref = collection(db, coll)

        const collectionData = query(ref, ...queryConstraints)

        // listen to changes in collection
        const unSubscribe = onSnapshot(collectionData, (snapshot) => {
            const docs = snapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data(),
                }
            })

            setData(docs)
        })

        return unSubscribe
    }, [])

    return {
        data
    }
}

export default useStreamCollection