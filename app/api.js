import { AsyncStorage } from 'react-native'
import dummyData from './DUMMY-DATA'

export function login (username) {
  return AsyncStorage.setItem('username', username)
}

export function getUsername () {
  return AsyncStorage.getItem('username')
    .then((username) => username || '')
}

export function getQuestions () {
  return AsyncStorage.getItem('questions')
    .then((questions) => questions
      ? JSON.parse(questions)
      : setDummyQuestions().then((questions) => questions)
    )
}

function setDummyQuestions () {
  return AsyncStorage.setItem('questions', JSON.stringify(dummyData))
    .then(() => dummyData)
}