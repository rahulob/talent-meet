import axios from "axios"
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_API_URL,
    withCredentials: true, // sends cookies to server on every request automatically
})

export default axiosInstance