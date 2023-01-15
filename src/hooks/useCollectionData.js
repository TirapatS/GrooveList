import { collection } from 'firebase/firestore'
import { useCollectionData } from "react-firebase-hooks/firestore"
import { db } from '../firebase'


const useGetCollection = (path) => {
    const query = collection(db, path)
    const [docs, loading, error] = useCollectionData(query)
    return [docs, loading, error]
}

export default useGetCollection