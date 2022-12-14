import {
  ChangePasswordInterface, confirmPhoneNumberInterface,
  emailVerificationInterface,
  RegisterDataInterface,
  SimpleLoginDataInterface, UpdateProfileInterface, VerifyPasswordDataInterface,
} from '../../../utils/interfaces/apiInterfaces/authInterfaces'
import { Executor } from '../../../utils/executor'
import { authEndpoints } from '../../../utils/endpoints'
import { mapObjectToInterface } from '../../../utils/func/commonFuncs'
import UserModelInterface, { userModelKeys } from '../../../utils/interfaces/modelsInterfaces/User'
import { store } from '../../store'
import { setConnectedUser } from './authenticationSlice'
import { getCart } from '../cart/cartService'
import { getRestaurantById } from '../announces/announcesService'


export const getProfileByToken = (isSilent?: boolean) => {
  return Executor({
    isSilent,
    method: 'get',
    payloadData: null,
    endPoint: authEndpoints.getMyProfile,
    successFunc: (data: any) => {
      store.dispatch(setConnectedUser(mapObjectToInterface(data, userModelKeys) as UserModelInterface))
    },
  })
}

export const loginRequest = (data: any, url: string) => {
  return Executor({
    method: 'post',
    payloadData: data,
    endPoint: url,
    successFunc: (data: {
      user: any,
      token: string
    }) => {
      store.dispatch(setConnectedUser(mapObjectToInterface(data.user, userModelKeys) as UserModelInterface))
      // localStorage.clear()
      localStorage.setItem('myDishWeb', data.token)
      getCart().then((res: any) => {
        if(!res.data) {
          localStorage.removeItem('ORDER_DETAILS')
          localStorage.removeItem('ORDER_CONFIRMATION_DETAILS')
        }
      })
    },
  })
}

export const registerRequest = (data: RegisterDataInterface) => {
  return Executor({
    method: 'post',
    payloadData: data,
    endPoint: authEndpoints.register,
  })
}

export const changePasswordRequest = (data: ChangePasswordInterface) => {
  return Executor({
    method: 'put',
    payloadData: data,
    endPoint: authEndpoints.changePassword,
  })
}

export const updateProfileRequest = (data: UpdateProfileInterface) => {
  return Executor({
    method: 'put',
    payloadData: data,
    endPoint: authEndpoints.updateProfile,
    successFunc: (data: any) => {
      store.dispatch(setConnectedUser(mapObjectToInterface(data, userModelKeys) as UserModelInterface))
    },
  })
}

export const confirmPhoneNumber = (data: confirmPhoneNumberInterface) => {
  return Executor({
    method: 'post',
    payloadData: data,
    endPoint: authEndpoints.confirmPhoneNumber,
  })
}


export const verifyEmail = (config: {email: string}) => {
  return Executor({
    method: 'get',
    payloadData: null,
    endPoint: authEndpoints.verifyEmail(config.email)
  })
}

export const verifyPassword = (data: VerifyPasswordDataInterface) => {
  return Executor({
    method: 'post',
    payloadData: data,
    endPoint: authEndpoints.verifyPassword,
  })
}