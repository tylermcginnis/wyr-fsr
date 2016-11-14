import React, { PropTypes, Component } from 'react'
import { View, Text, ActivityIndicator, Navigator, Platform, ListView } from 'react-native'
import Username from './components/Username'
import Home from './components/Home'
import NewQuestion from './components/NewQuestion'
import { getUsername, login, getQuestions, saveQuestions } from './api'

function Loading () {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator />
    </View>
  )
}

export default class WouldYouRather extends Component {
  constructor (props) {
    super(props)
    this.questions = []
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      dataSource: this.ds.cloneWithRows([]),
      loading: true,
      username: '',
    }
  }
  componentDidMount () {
    Promise.all([
      getUsername(),
      getQuestions(),
    ]).then(([username, questions]) => {
      this.questions = questions
      this.setState({
        username,
        dataSource: this.ds.cloneWithRows(questions),
        loading: false,
      })
    })
  }
  handleSubmitUsername = (username) => {
    login(username)
    this.setState({username})
  }
  handleSubmitQuestion = (question, navigator) => {
    const newQuestions = this.questions.concat([{
      title: question.title,
      author: this.state.username,
      timestamp: Date.now(),
      firstOption: {
        votes: 0,
        option: question.firstOption,
      },
      secondOption: {
        votes: 0,
        option: question.secondOption,
      }
    }])
    this.setState({
      dataSource: this.ds.cloneWithRows(newQuestions),
    })
    saveQuestions(newQuestions)
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
          dataSource={this.state.dataSource}
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
