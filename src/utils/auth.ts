import Cookies from 'js-cookie'

const TokenKey = 'cake_oms_mobile_token'

export function getToken(): string {
  return Cookies.get(TokenKey) || ""
}

export function setToken(token: string): string | undefined {
  return Cookies.set(TokenKey, token)
}

export function removeToken(): void {
  return Cookies.remove(TokenKey)
}
