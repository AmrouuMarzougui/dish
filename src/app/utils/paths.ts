

export const Paths = {
  home: '/home',
  aboutUs: '/aboutUs',
  help: '/help',
  faq: '/faq',
  condition: '/condition',
  privacyPolicy: '/privacyPolicy',
  contactUs: '/contactUs',
  restaurantHome: '/restaurantHome',
  auth: {
    index: '/auth',
    register: 'createAccount',
    passwordForgotten: 'forgotPassword'
  },
  market: {
    index: '/market/:name',
  },
  searchResult: '/searchResult',
  restaurant: '/restaurant/:id',
  restaurantRates: '/restaurantRates/:id',
  shop: '/shop',
  cart: '/cart',
  mobileProfile: '/monProfile',
  profile: {
    index: '/profile',
    security: 'security',
    myReservations: 'myReservations',
    fidelity: 'loyaltySpace',
    rates: 'rates',
    favorites: 'favorites',
  },
  security: {
    index: '/security',
    phone: 'phone',
    password: 'password',
  },
  redirect: '*'
}
