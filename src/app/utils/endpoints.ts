
export const baseUrl = 'https://mydish-application-api.herokuapp.com'
// export const baseUrl = 'http://localhost:5000'


export const authEndpoints = {
  login: '/auth/login',
  loginWithFacebook: '/auth/loginWithFacebook',
  loginWithGoogle: '/auth/loginWithGoogle',
  register: '/user/register',
  getMyProfile: '/user/profile',
  changePassword: '/user/changePassword',
  updateProfile: '/user/updateInfo',
  confirmPhoneNumber: '/user/confirmSms',
  verifyEmail: (email: string) => `/user/verifyEmail/${email}`,
  verifyPassword: '/User/verifyPassword',
}

export const commonEndpoints = {
  myReservations: '/Order/getReservationList',
  myPromoCodes: '/PromoCode/getMyPromoCodes',
  myRates: '/user/getMyRates'
}


export const announcesEndpoints = {
  addRating: '/Rating/add',
  updateRating: (id: string) => `/Rating/update/${id}`,
  deleteRating: (RatingId: string) => `/Rating/delete/${RatingId}`,
  search: '/Restaurant/searchRestaurant',
  mainHome: '/Restaurant/restaurantInHomePage',
  newRestaurants: '/Restaurant/getRestaurantList',
  restaurantsSpecialities: '/Restaurant/restaurantSpecialities',
  nearbyRestaurants: '/user/getNearByRestaurants',
  getRestaurantById: (id: string) => `/Restaurant/restaurantDetails/${id}`,
  setFavoriteRestaurant: (id: string, favorite: boolean) => `/user/${!favorite ? 'bookmarkRestaurant' : 'unbookmarkRestaurant'}/${id}`,
  addMyRestaurant: '/User/addMyRestaurant',
  getSection: (id: string) => `/section/${id}`,
  getPaymentMethod: (id: string) => `/Restaurant/restaurantPaymentMethods/${id}`
}

export const cartEndpoints = {
  addToCart: '/ShoppingCart/addToCart',
  removeFromCart: '/ShoppingCart/removeFromCart',
  getCart: '/ShoppingCart/getProductInCart',
  passOrder: '/Order/passOrder',
  deleteOrder: (id: string) => `/Order/deleteOrder/${id}`,
  decrement: `/ShoppingCart/decrementProductInCart`,
  increment: `/ShoppingCart/incrementProductInCart`,
  checkIfIntentPayed: (key: string) => `/Order/checkIfOrderPayed/${key}`,
  clearCart: '/ShoppingCart/clearMyCart'
}
