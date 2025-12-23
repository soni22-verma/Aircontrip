const BASE_URL = import.meta.env.VITE_BACKEND_URL;
const api = {

  user: {
    register:BASE_URL+"/user/signup",
    login:BASE_URL+"/user/login",

  },
}
export default api




