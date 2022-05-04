import UserModuleTypes from '@/store/modules/user/interface'
import in_array from 'in_array'
import { useStore } from '@/store'

export function isErrorResponse(response: any): boolean {
  return typeof response.status !== undefined && response.status >= 400
}

export function maskPhoneNumber(number: string | null): string {

  if(!number) {
    return '';
  }

  if (number.length < 11) {
    return number
  }
  const data = number.match(/(\d{3})(\d{4})(\d{4})/)
  if (data) {
    return `${data[1] || ''}****${data[3]}`
  }
  return number;
}


export function isAdministrator(user: UserModuleTypes): boolean {
  if(in_array('administrator', user.roles)) {
    return true;
  }
  return false;
}

export function isMySubordinate(user: UserModuleTypes, userId: number): boolean {

  if(in_array(userId, user.subordinates)) {
    return true;
  }
  return false;
}


export const getCurrentUser = (): UserModuleTypes => {
  const store = useStore()
  return store.state.userModule
}
