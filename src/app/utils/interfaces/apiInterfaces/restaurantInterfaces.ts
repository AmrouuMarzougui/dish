export interface AddMyRestaurantDataInterface {
    name: string,
    owner: {
      firstName: string,
      lastName: string
    },
    address: string,
    phoneNumber: string,
    login: string
  }