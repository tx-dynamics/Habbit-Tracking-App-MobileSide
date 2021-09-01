import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat';
import io from "socket.io-client";

import { connect } from 'react-redux';
import { SetSession } from '../../../Redux/Actions/Actions';
import Axios from '../../../Components/Axios';
import { BaseUrl, } from '../../../Constants/BaseUrl'

const ENDPOINT = "https://mindful-leader-athlete.herokuapp.com";
var socket;

const ChatScreen1 = (props) => {
  const [messages, setMessages] = useState([
    {
      _id: 1,
      text: 'Hello developer',
      createdAt: new Date(),
      user: { _id: 2, name: 'Name' },
    },
    {
      _id: 2,
      text: 'Hello World',
      createdAt: new Date(),
      user: { _id: 2, name: 'Name' },
    },
  ]);

  const getAllMessages = async () => {
    fetch(BaseUrl + "message/" + props.userData.company, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then((response) => response.json())
      .then((response) => {
        alert(JSON.stringify(response))
        let msg = {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: { _id: 2, name: 'Name' },
        }
        // setMessages((messages) => [...messages, msg]);
      })
      .catch((err) => {
        console.log(err)
      })
  };



  useEffect(() => {
    socket = io(ENDPOINT);
    let roomId = props.userData.company;
    let userId = props.userId;
    socket.emit("join", { userId, roomId }, (error) => {
      if (error) {
        alert(error);
      }
    });
    getAllMessages();
  }, [])



  useEffect(() => {
    socket.on("message", (message) => {
      console.log("Recieve Message: ", message);
      //   setMessages((messages) => [...messages, message]);
    });
  }, []);


  const onSend = (newMessage = []) => {
    socket.emit("sendMessage", newMessage[0].text, (res) => {
    });
  };
  // const onSend = (newMessage = []) => {
  //   setMessages(GiftedChat.append(messages, newMessage));
  // };

  return (
    // <View style={{ flex: 1 }}>
    //   <FlatList
    //     style={{ flex: 1 }}
    //     data={messages}
    //     extraData={messages}
    //     showsVerticalScrollIndicator={false}
    //     keyExtractor={(item, index) => index.toString()}
    //     renderItem={({ item, index }) => (
    //     <Text>{item.text}</Text>
    //     )} />

    // </View>

    <GiftedChat
      messages={messages}
      onSend={newMessage => onSend(newMessage)}
      user={{
        _id: 1,
      }}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    userId: state.AuthReducer.userId,
    userData: state.AuthReducer.userData,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    SessionMaintain: (data) => dispatch(SetSession(data))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ChatScreen1);
