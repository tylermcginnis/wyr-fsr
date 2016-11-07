import { AsyncStorage } from 'react-native'

export function login (username) {
  return AsyncStorage.setItem('username', username)
}

export function getUsername () {
  return AsyncStorage.getItem('username')
    .then((username) => username || '')
}