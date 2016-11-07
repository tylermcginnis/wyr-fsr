import React, { PropTypes, Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import Navbar from './Navbar'

export default class NewQuestion extends Component {
  static propTypes = {
    onCancel: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
  }
  state = {}
  render () {
    return (
      <View>
        <Navbar
          title='New Question'
          leftButton={() => (
            <TouchableOpacity
              onPress={this.props.onCancel}
              style={[{marginLeft: 10}, styles.navContainer]}>
                <Text style={styles.navText}>Cancel</Text>
            </TouchableOpacity>
          )}
          rightButton={() => (
            <TouchableOpacity
              onPress={this.props.onSubmit}
              style={[{marginRight: 10}, styles.navContainer]}>
                <Text style={styles.navText}>Submit</Text>
            </TouchableOpacity>
          )}
        />
        <Text>
          NewQuestion
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  navContainer: {
    justifyContent: 'center',
  },
  navText: {
    fontSize: 15,
  }
})
