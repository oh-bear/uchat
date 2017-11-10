import React, {Component} from 'react'
import LoginPage from './containers/Login'

import {Scene, Router, ActionConst} from 'react-native-router-flux'
import * as scenes from './constants/scene'
import SplashScreen from './SplashScreen'
import {Provider} from 'react-redux'
import store from './redux/store'

export default class AppRouter extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Scene key="root">
            <Scene
              key={scenes.SCENE_SPLASH_SCREEN}
              component={SplashScreen}
              initial
              type={ActionConst.RESET}
              duration={0}
              hideNavBar
            />
            <Scene
              key={scenes.SCENE_LOGIN}
              component={LoginPage}
              title="登录"
              type={ActionConst.RESET}
              duration={0}
              hideNavBar
            />
          </Scene>
        </Router>
      </Provider>
    )
  }
}
