import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Image
} from 'react-native'
import Chat from './Chat'
import Profile from './Profile'
import { HEIGHT, getResponsiveHeight } from '../common/styles'
import TabNavigator from 'react-native-tab-navigator'
import Home from './Home'

export default class Index extends Component {

  state = {
    selectedTab: 'home'
  }

  icons = {
    home: {
      default: (
        <Image
          style={styles.image}
          source={require('../../res/images/Home.png')}
        />
      ),
      selected: <Image source={require('../../res/images/Home1.png')} />
    },
    chat: {
      default: (
        <Image
          style={styles.image}
          source={require('../../res/images/message.png')}
        />
      ),
      selected: (
        <Image
          style={styles.image}
          source={require('../../res/images/message1.png')}
        />
      )
    },
    profile: {
      default: (
        <Image
          style={styles.image}
          source={require('../../res/images/profile.png')}
        />
      ),
      selected: <Image source={require('../../res/images/profile1.png')} />
    }
  }

  render() {
    return (
      <View style={styles.tabs_container}>
        <TabNavigator>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'home'}
            title="广场"
            renderIcon={() => this.icons.home.default}
            renderSelectedIcon={() => this.icons.home.selected}
            onPress={() => this.setState({ selectedTab: 'home' })}
          >
            <Home />
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'chat'}
            title="消息"
            renderIcon={() => this.icons.chat.default}
            renderSelectedIcon={() => this.icons.chat.selected}
            onPress={() => this.setState({ selectedTab: 'chat' })}
          >
            <Chat />
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'profile'}
            title="我的"
            renderIcon={() => this.icons.profile.default}
            renderSelectedIcon={() => this.icons.profile.selected}
            onPress={() => this.setState({ selectedTab: 'profile' })}
          >
            <Profile />
          </TabNavigator.Item>
        </TabNavigator>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    // flex:1,
    flexDirection: 'column',
    backgroundColor: 'rgb(242,246,250)',
    alignItems: 'center',
    height: HEIGHT
  },
  top: {
    height: 28,
    backgroundColor: 'white',
    marginTop: -28,
    width: 375
  },
  book_list: {
    // 一半的输入框高度加上maginBottom
    paddingTop: getResponsiveHeight(10)
  },
  search_result_bar: {
    backgroundColor: 'white'
  },
  tabs_container: {
    flex: 1,
    backgroundColor: 'white'
  },
  page1: {
    flex: 1,
    backgroundColor: 'yellow'
  },
  page2: {
    flex: 1,
    backgroundColor: 'blue'
  },
  image: {
    // tintColor: '#929292'
  },
  active: {
    tintColor: '#607D8B'
  }
})
