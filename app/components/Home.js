import React, { PropTypes, Component } from 'react'
import { View, ScrollView, Text, TouchableOpacity, ListView } from 'react-native'
import Navbar from './Navbar'

export default class Home extends Component {
  static propTypes = {
    dataSource: PropTypes.object.isRequired,
    toNewQuestion: PropTypes.func.isRequired,
  }
  renderRow = (question) => {
    return <Text>{JSON.stringify(question)}</Text>
  }
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
        <ScrollView>
          <ListView renderRow={this.renderRow} dataSource={this.props.dataSource} />
        </ScrollView>
      </View>
    )
  }
}
