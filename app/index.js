import React, { PropTypes, Component } from 'react'
import { View, Text, ActivityIndicator, Navigator, Platform, ListView } from 'react-native'
import Username from './components/Username'
import Home from './components/Home'
import NewQuestion from './components/NewQuestion'
import Question from './components/Question'
import { getUsername, login, getQuestions, saveQuestions, getUsersVotes } from './api'

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
    let username = ''
    getUsername()
      .then((name) => {
        username = name
        return name
      })
      .then(() => Promise.all([
        getUsersVotes(username),
        getQuestions(),
      ]))
      .then(([votes, questions]) => {
        this.questions = questions
        this.setState({
          username,
          dataSource: this.ds.cloneWithRows(questions),
          votes,
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
    } else if (route.question === true) {
      return (
        <Question
          onCancel={navigator.pop}
          hasVoted={!!this.state.votes[route.questionInfo.id]}
          info={route.questionInfo} />
      )
    } else {
      return (
        <Home
          votes={this.state.votes}
          dataSource={this.state.dataSource}
          toQuestion={(questionInfo) => navigator.push({question: true, questionInfo})}
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
