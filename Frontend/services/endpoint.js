
const BASE_URL = import.meta.env.VITE_BACKEND_URL;
const api = {

  user: {
    register:BASE_URL+"/user/signup",
    login:BASE_URL+"/user/login",
    userdata:BASE_URL+"/user/user-data",
    userprofile:BASE_URL+"/user/user-profile",
   bookingticket:BASE_URL+"/user/booking-ticket",
   destopProfile:BASE_URL+"/user/destop-profile",
   updateprofile:BASE_URL+"/user/update-profile"
  },
   image: {
    uploadImage: BASE_URL + "/user/upload-image",
  },
  booking:{
    ticketbooking:BASE_URL+"/booking/ticket-booking",
    bookingdetails:BASE_URL+"/booking/all-booking-details",
    userDetails:BASE_URL+"/booking/get-user-details"
  }

}
export default api




