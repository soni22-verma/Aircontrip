const BASE_URL = import.meta.env.VITE_BACKEND_URL;
const api = {

  user: {
    register:BASE_URL+"/user/signup",
    login:BASE_URL+"/user/login",
    userdata:BASE_URL+"/user/user-data",
    userprofile:BASE_URL+"/user/user-profile"

  },
}
export default api




