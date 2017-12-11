import React, { Component } from 'react'
import { ScrollView, Text, Image, View, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { Images } from '../Themes'
const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
} = FBSDK;

//Actions
import InputActions from '../Redux/InputRedux'

// Styles
import styles from './Styles/LaunchScreenStyles'

class LaunchScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      inputVal: ''
    }
  }

  updateText = () => {
    this.props.addItem(this.state.inputVal)

    this.setState({inputVal: ''})

    this.refs.toDoInput.focus()
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
        <ScrollView style={styles.container}>

          <View style={styles.section} >
            <Text style={styles.sectionText}>
              My TODO List
            </Text>
            <TextInput
              placeholder={'Enter Task here'}
              ref='toDoInput'
              value={this.state.inputVal}
              onChangeText={text => this.setState({inputVal: text})}
              onBlur={this.updateText}
            />
            {
              this.props.inputList.map((input, i) => {
                return (
                  <Text key={i}>
                    {`${i}. ${input}`}
                  </Text>
                )
              })
            }
            <LoginButton
              publishPermissions={["publish_actions"]}
              onLoginFinished={
                (error, result) => {
                  if (error) {
                    alert("Login failed with error: " + result.error);
                  } else if (result.isCancelled) {
                    alert("Login was cancelled");
                  } else {
                    alert("Login was successful with permissions: " + result.grantedPermissions)
                  }
                }
              }
              onLogoutFinished={() => alert("User logged out")}
              />
          </View>


        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  inputList: state.input.inputList
})

const mapDispatchToProps = dispatch => {
  return {
    addItem: text => dispatch(InputActions.enter(text))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LaunchScreen)
