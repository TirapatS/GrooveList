import axios from 'axios'
import { Buffer } from 'buffer'
import qs from 'qs'
import { toast } from 'react-toastify'

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
        localStorage.setItem('authAccess', response.data.access_token)
        localStorage.setItem('authTimer', new Date().getTime())
    }catch(error){
        console.log(error)
    }
}

const checkAccessToken = async () => {
    const token = localStorage.getItem('authAccess');
    if (!token) {
      getAuth()
    }
    try {
        let hour = 60 * 60 * 1000;
        const anHourAgo = Date.now() - hour;
        if(localStorage.getItem('authTimer') > anHourAgo) {
           getAuth()
        }
    } catch (e) {
        console.log(e)
    }
}

const getNewRelease = async () => {
    checkAccessToken()
    const accessToken = localStorage.getItem('authAccess')

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

const exports = {
    getNewRelease
}

export default exports