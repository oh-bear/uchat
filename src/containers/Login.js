import React, {Component} from 'react'
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
import loading from '../common/loading'
import {USERS} from '../network/Urls'
import HttpUtils from '../network/HttpUtils'

const URL = USERS.login

export default class Login extends Component {

  state = {
    account: '',
    password: ''
  }

  onSubmit = async () => {

    console.log('submit')

    const {
      account,
      password
    } = this.state

    HttpUtils.post(URL, {
      account,
      password
    }).then(res => {
      console.log(res)
      Actions[SCENE_INDEX]({user: response.data})
    })

    if (!this.validatePassed) {
      return
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.bg}
               source={require('../../res/images/bg_sign.png')}>
          <Image style={styles.card}
                 source={require('../../res/images/card_sign.png')}>
            <View style={styles.switch_container}>
              <TextPingFang style={styles.switch_login}>登录</TextPingFang>
              <TextPingFang style={styles.switch_register}>注册</TextPingFang>
            </View>
            <View style={styles.input_container}>
              <TextInput
                placeholder={'手机号码'}
                placeholderTextColor={'rgba(0,0,0,0.52)'}
                style={styles.text_input}
                onChangeText={text => {
                  this.setState({account: text})
                }}
                defaultValue={this.state.account}/>
              <TextInput
                placeholder={'您的密码'}
                placeholderTextColor={'rgba(0,0,0,0.52)'}
                style={styles.text_input}
                onChangeText={text => {
                  this.setState({password: text})
                }}
                defaultValue={this.state.password}
                password={true}
                secureTextEntry/>
              <TouchableOpacity
                onPress={this.onSubmit}
                style={styles.btn_login}
              >
                <Image source={require('../../res/images/btn_signin.png')}/>
              </TouchableOpacity>
            </View>
          </Image>
        </Image>
        <TextPingFang style={styles.license}>确认登录代表您已经默认同意相关协议条款</TextPingFang>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    width: WIDTH,
    height: HEIGHT,
    alignItems: 'center'
  },
  bg: {
    alignItems: 'center',
    width: WIDTH,
    height: HEIGHT
  },
  card: {
    width: getResponsiveWidth(341),
    height: getResponsiveHeight(400),
    marginTop: getResponsiveHeight(127),
    alignItems: 'center',
    flexDirection: 'column'
  },
  switch_container: {
    flexDirection: 'row',
    marginTop: getResponsiveHeight(30),
    width: getResponsiveWidth(230),
    height: getResponsiveHeight(80),
    justifyContent: 'space-between'
  },
  switch_login: {
    width: getResponsiveWidth(49),
    height: getResponsiveHeight(33),
    lineHeight: getResponsiveHeight(33),
    fontSize: 24,
    color: '#333',
    fontWeight: '600',
  },
  switch_register: {
    width: getResponsiveWidth(49),
    height: getResponsiveHeight(33),
    lineHeight: getResponsiveHeight(33),
    fontSize: 24,
    color: '#333',
    fontWeight: '600',
  },
  license: {
    position: 'absolute',
    height: getResponsiveHeight(11),
    lineHeight: getResponsiveHeight(11),
    bottom: getResponsiveHeight(21),
    fontSize: 8,
    color: '#999',
    fontWeight: '600',
    letterSpacing: 0.65
  },
  input_container: {
    flexDirection: 'column',
    marginTop: getResponsiveHeight(50),
    width: getResponsiveWidth(230),
    height: getResponsiveHeight(300),
  },
  text_input: {
    marginTop: getResponsiveHeight(14),
    height: getResponsiveHeight(44),
    width: getResponsiveWidth(240),
    backgroundColor: 'rgb(255,255,255)',
    borderRadius: getResponsiveHeight(22),
    marginBottom: getResponsiveHeight(14),
    alignItems: 'center',
    paddingLeft: getResponsiveWidth(10),
    flexDirection: 'row',
    fontSize: 14,
    color: '#333'
  }
})