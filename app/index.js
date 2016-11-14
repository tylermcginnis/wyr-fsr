import React, { PropTypes, Component } from 'react'
import { View, Text, ActivityIndicator, Navigator, Platform } from 'react-native'
import Username from './components/Username'
import Home from './components/Home'
import NewQuestion from './components/NewQuestion'
import { getUsername, login, getQuestions } from './api'

function Loading () {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator />
    </View>
  )
}

export default class WouldYouRather extends Component {
  state = {
    loading: true,
    username: '',
    questions: [],
  }
  componentDidMount () {
    Promise.all([
      getUsername(),
      getQuestions(),
    ]).then(([username, questions]) => {
      this.setState({
        username,
        questions,
        loading: false,
      })
    })
  }
  handleSubmitUsername = (username) => {
    login(username)
    this.setState({username})
  }
  handleSubmitQuestion = (question, navigator) => {
    this.setState({
      questions: this.state.questions.concat([{...question, timestamp: Date.now()}])
    })
    navigator.pop()
  }
  renderScene = (route, navigator) => {
    if (this.state.loading === true) {
      return <Loading />
    } else if (this.state.username === '') {
      return <Username onSubmitUsername={this.handleSubmitUsername} />
    } else if (route.newQuestion === true) {
      return (
        <NewQuestion
          onCancel={navigator.pop}
          onSubmit={(question) => this.handleSubmitQuestion(question, navigator)} />
      )
    } else {
      return (
        <Home
          questions={this.state.questions}
          username={this.state.username}
          toNewQuestion={() => navigator.push({newQuestion: true})} />
      )
    }
  }
  configureScene = (route) => {
    if (Platform.OS === 'android') {
      return Navigator.SceneConfigs.FloatFromBottomAndroid
    }

    if (route.newQuestion === true) {
      return Navigator.SceneConfigs.FloatFromBottom
    }

    return Navigator.SceneConfigs.FloatFromRight
  }
  render () {
    return (
      <Navigator
        initialRoute={{}}
        renderScene={this.renderScene}
        configureScene={this.configureScene} />
    )
  }
}
