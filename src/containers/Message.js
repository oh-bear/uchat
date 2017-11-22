import React, {Component} from 'react'
import {
  View,
  StyleSheet,
  Text,
  Image,
  ListView,
  TouchableOpacity,
  TouchableHighlight
} from 'react-native'
import {HEIGHT, getResponsiveHeight} from '../common/styles'
import {USERS, CHATS} from '../network/Urls'
import HttpUtils from '../network/HttpUtils'

import {SwipeListView, SwipeRow} from 'react-native-swipe-list-view'
import {connect} from 'react-redux'
import {Actions} from 'react-native-router-flux'
import * as scenes from '../constants/scene'

const URL_LIST = CHATS.list

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

@connect(mapStateToProps)
export default class Message extends Component {

  constructor(props) {
    super(props)
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      listViewData: ['']
    }
  }

  componentWillMount() {
    HttpUtils.get(URL_LIST + '/' + this.props.user._id).then(
      res => {
        if (res.code === 0) {
          this.setState({
            listViewData: res.data
          })
        }
      }
    )
  }

  onJump = (page, id) => {
    Actions[page]({id})
  }

  deleteRow(secId, rowId, rowMap) {
    rowMap[`${secId}${rowId}`].closeRow()
    const newData = [...this.state.listViewData]
    newData.splice(rowId, 1)
    this.setState({listViewData: newData})
  }

  render() {
    return (
      <View style={styles.container}>
        <SwipeListView
          dataSource={this.ds.cloneWithRows(this.state.listViewData)}
          renderRow={ (data, secId, rowId, rowMap) => (
            <SwipeRow
              disableRightSwipe={true}
              leftOpenValue={20 + Math.random() * 150}
              rightOpenValue={-150}
            >
              <View style={styles.rowBack}>
                <TouchableOpacity
                  style={[styles.backRightBtn, styles.backRightBtnRight]}
                  onPress={ () => this.deleteRow(secId, rowId, rowMap) }>
                  <Text style={styles.backTextRed}>删除</Text>
                </TouchableOpacity>
              </View>
              <TouchableHighlight
                onPress={ () => {
                  this.onJump(scenes.SCENE_CHAT, data._id)
                }}
                underlayColor={'#AAA'}
              >
                <View style={styles.rowFront}>
                  <Image style={styles.avatar} source={{uri: 'https://airing.ursb.me/image/avatar/40.png'}}/>
                  <View style={styles.content}>
                    <Text style={styles.name}>{data.account}</Text>
                  </View>
                </View>
              </TouchableHighlight>
            </SwipeRow>
          )}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1
  },
  backTextRed: {
    color: '#FF4057'
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75
  },
  backRightBtnLeft: {
    backgroundColor: 'blue',
    right: 75
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0
  },
  rowFront: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#F6F6F6',
    height: 80,
    padding: 16
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24
  },
  content: {
    marginLeft: 16,
    width: 192,
    height: 48
  },
  name: {
    fontFamily: 'PingFang SC',
    color: '#333',
    fontSize: 14
  }
})
