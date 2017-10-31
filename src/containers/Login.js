import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Text,
  Navigator,
  TouchableOpacity,
  Image,
  ImageBackground,
  ScrollView,
  TextInput,
  AsyncStorage
} from 'react-native'
import TextPingFang from '../components/TextPingFang'
import {
  WIDTH,
  HEIGHT,
  getResponsiveHeight,
  getResponsiveWidth
} from '../common/styles'
import Toast from 'antd-mobile/lib/toast'
import Storage from '../common/storage'
import login from '../network/login'
import loading from '../common/loading'
import { USERS } from '../network/Urls'

const URL = USERS.login

export default class Login extends Component {
  render() {
    return(
      <Text>Login</Text>
    )
  }
}