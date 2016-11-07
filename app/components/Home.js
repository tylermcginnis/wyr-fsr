import React, { PropTypes, Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import Navbar from './Navbar'

export default class Home extends Component {
  static propTypes = {
    username: PropTypes.string.isRequired,
    toNewQuestion: PropTypes.func.isRequired,
  }
  state = {}
  render () {
    return (
      <View>
        <Navbar
          title='Home'
          rightButton={() => (
            <TouchableOpacity
              onPress={this.props.toNewQuestion}
              style={{justifyContent: 'center', marginRight: 10}}>
                <Text style={{fontSize: 35}}>+</Text>
            </TouchableOpacity>
          )}
        />
        <Text>
          Username: {this.props.username}
        </Text>
      </View>
    )
  }
}
