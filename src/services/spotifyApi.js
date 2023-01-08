import axios from 'axios'
import { Buffer } from 'buffer'
import qs from 'qs'


const clientId = import.meta.env.VITE_SPOTIFY_PUBLIC_CLIENT_ID
const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET
const authToken = Buffer.from(`${clientId}:${clientSecret}`, 'utf-8').toString('base64');
const baseUrl = 'https://api.spotify.com/v1/'


const getAuth = async () => {
    try {
        const url = 'https://accounts.spotify.com/api/token'
        const data = qs.stringify({ grant_type: "client_credentials" })

        const response = await axios.post(url,data, {
            headers: { 
              'Authorization': "Basic " + authToken,
              'Content-Type': 'application/x-www-form-urlencoded' 
            }
        })
        return response.data.access_token
    }catch(error){
        console.log(error)
    }
}


const getNewRelease = async () => {
    const accessToken = await getAuth()

    try {
        const response = await axios.get(baseUrl + 'browse/new-releases', {
            headers: {
              'Authorization': `Bearer ${accessToken}`
            }
        })
        
        return response.data
    } catch (error) {
        console.log(error)
    }
}

const getCategories = async (page) => {
    const accessToken = await getAuth()

    try {
        const response = await axios.get(baseUrl + `browse/categories?country=SE&offset=${page}&limit=20`, {
            headers: {
              'Authorization': `Bearer ${accessToken}`
            }
        })
        
        return response.data
    } catch (error) {
        console.log(error)
    }
}

const getCategory = async (id, page) => {
    const accessToken = await getAuth()

    try {
        const response = await axios.get(baseUrl + `browse/categories/${id}/playlists?offset=${page}&limit=20`, {
            headers: {
              'Authorization': `Bearer ${accessToken}`
            }
        })
        return response
    } catch (error) {
        console.log(error)
    }
}


const exports = {
    getNewRelease,
    getCategories,
    getCategory
}

export default exports