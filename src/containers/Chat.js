import React, {Component} from 'react'
import {
  View,
  StyleSheet,
  Text
} from 'react-native'
import {HEIGHT, getResponsiveHeight} from '../common/styles'
import {GiftedChat, Actions} from 'react-native-gifted-chat'
import io from 'socket.io-client'
import {connect} from 'react-redux'

const socket = io('ws://localhost:9093')

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

@connect(mapStateToProps)
export default class Chat extends Component {

  constructor(props) {
    super(props)

    this.state = {
      messages: [{
        _id: 1,
        text: '',
        createdAt: new Date(),
        user: {},
      }],
    }

    this.renderCustomActions = this.renderCustomActions.bind(this);
  }

  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: '',
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://facebook.github.io/react/img/logo_og.png',
          },
        },
      ],
    })
  }

  componentDidMount() {
    socket.on('recvmsg', (d) => {
      this.setState((previousState) => ({
        messages: GiftedChat.append(previousState.messages, d.data),
      }))
    })
  }

  renderCustomActions(props) {
    const options = {
      'Action 1': (props) => {
        alert('option 1')
      },
      'Action 2': (props) => {
        alert('option 2')
      },
      'Cancel': () => {},
    }
    return  <Actions
      {...props}
      options={options}
    />
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        showUserAvatar={true}
        renderActions={this.renderCustomActions}
        onSend={(messages) => {
          socket.emit('sendmsg', {data: Object.assign({t_user: {_id: 222}}, messages[0])})
        }}
        user={{
          _id: this.props.user._id,
          avatar: 'https://airing.ursb.me/image/avatar/0.png'
        }}
      />
    )
  }
}