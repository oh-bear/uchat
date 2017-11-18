import React, {Component} from 'react'
import {
  View,
  StyleSheet,
  Text,
  ListView,
  TouchableOpacity,
  TouchableHighlight
} from 'react-native'
import {HEIGHT, getResponsiveHeight} from '../common/styles'
import {SwipeListView, SwipeRow} from 'react-native-swipe-list-view'
import {connect} from 'react-redux'
import {Actions} from 'react-native-router-flux'
import * as scenes from '../constants/scene'


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
      listViewData: Array(20).fill('').map((_, i) => `item #${i}`)
    }
  }

  onJump = (page, title) => {
    Actions[page]({title})
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
                <View style={[styles.backRightBtn, styles.backRightBtnLeft]}>
                  <Text style={styles.backTextWhite}>Right</Text>
                </View>
                <TouchableOpacity
                  style={[styles.backRightBtn, styles.backRightBtnRight]}
                  onPress={ () => this.deleteRow(secId, rowId, rowMap) }>
                  <Text style={styles.backTextWhite}>Delete</Text>
                </TouchableOpacity>
              </View>
              <TouchableHighlight
                onPress={ () => {
                  this.onJump(scenes.SCENE_CHAT, rowId)
                }}
                style={styles.rowFront}
                underlayColor={'#AAA'}
              >
                <View>
                  <Text>I am {data} in a SwipeListView</Text>
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
  backTextWhite: {
    color: '#FFF'
  },
  rowFront: {
    alignItems: 'center',
    backgroundColor: '#CCC',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    justifyContent: 'center',
    height: 50,
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
  }
})
