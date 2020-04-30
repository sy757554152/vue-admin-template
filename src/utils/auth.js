import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'
const type = 'type'
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
export function getType() {
  return Cookies.get(type)
}
export function setType(token) {
  return Cookies.set(type, token)
}

export function removeType() {
  return Cookies.remove(type)
}
