import React, { PropTypes } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import Navbar from './Navbar'

Question.propTypes = {
  info: PropTypes.object.isRequired,
  hasVoted: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
}

export default function Question (props) {
  return (
    <View style={styles.container}>
      <Navbar
        title='Would you Rather'
        leftButton={() => (
          <TouchableOpacity
            onPress={props.onCancel}
            style={[{marginLeft: 10}, styles.navContainer]}>
              <Text style={styles.navText}>Cancel</Text>
          </TouchableOpacity>
        )}
      />
      <Text style={styles.title}>{props.info.title}</Text>
      <View style={styles.innerContainer}>
        <TouchableOpacity style={[styles.card, {backgroundColor: '#71B6F0'}]}>
          <Text style={styles.cardText}>{props.info.firstOption.option}wefewfewf</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.card, {backgroundColor: '#E71575'}]}>
          <Text style={styles.cardText}>{props.info.secondOption.option}ewfewfwefewfewfewfwe</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  navContainer: {
    justifyContent: 'center',
  },
  navText: {
    fontSize: 15,
  },
  innerContainer: {
    padding: 30,
    paddingTop: 0,
    flex: 1,
  },
  title: {
    textAlign: 'center',
    fontSize: 30,
    margin: 20,
  },
  card: {
    flex: 1,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    padding: 15,
  },
  cardText: {
    fontSize: 25,
    textAlign: 'center',
    color: '#fff',
  }





})