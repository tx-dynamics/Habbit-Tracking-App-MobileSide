import React, { useState, useEffect } from 'react';
import {
    View, Text, FlatList, StyleSheet, Image, TextInput, Platform,
    KeyboardAvoidingView, ScrollView
} from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat';
import io from "socket.io-client";

import { connect } from 'react-redux';
import { SetSession } from '../../../Redux/Actions/Actions';
import Axios from '../../../Components/Axios';
import { BaseUrl, } from '../../../Constants/BaseUrl'
import { wp } from '../../../Helpers/Responsiveness';
import { Colors } from '../../../Constants/Colors';
import { iconPath } from '../../../Constants/icon'
import Fonticon from '../../../Constants/FontIcon';

const ENDPOINT = "https://mindful-leader-athlete.herokuapp.com";
var socket;

const ChatScreenCompany = (props) => {
    const [messages, setMessages] = useState('');
    const [newMessage, setNewMessage] = useState('')
    const [pictureSelected, setpictureSelected] = useState(false)
    const [Imagebase64, setImagebase64] = useState("")


    const getAllMessages = async () => {
        fetch(BaseUrl + "message/" + props.userData.company, {
            method: 'GET',
            headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        })
            .then((response) => response.json())
            .then((response) => {
                // console.log("hdhjhdshsd" + JSON.stringify(response))
                setMessages(response.reverse())
            })
            .catch((err) => { console.log(err) })
    };

    useEffect(() => {
        socket = io(ENDPOINT);
        let roomId = props.userData.company;
        let userId = props.userId;
        socket.emit("join", { userId, roomId }, (error) => {
            if (error) {
                console.log(error);
            }
        });
        getAllMessages();
    }, [])

    useEffect(() => {
        setValues()
    }, [props.userData.profileImage])

    const setValues = async () => {
        if (props.userData.profileImage === undefined) {
        }
        else {
            // alert(JSON.stringify(props.userData.profileImage))
            await setImagebase64(props.userData.profileImage)
            setpictureSelected(true)
        }
    }

    useEffect(() => {
        socket.on("message", (message) => {
            // console.log("Recieve Messagessss: ", message);
            setMessages((messages) => [message, ...messages]);
        });
        return () => {
            // alert("hhh")
        }
    }, []);

    const onSend = () => {
        if (newMessage !== '') {
            socket.emit("sendMessage", newMessage, (res) => { });
            setNewMessage('')
        }
    };

    return (
        <View style={styles.container}>
            <FlatList
                style={{ flex: 1 }}
                data={messages}
                extraData={messages}
                inverted
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                ItemSeparatorComponent={(props) => {
                    return (<View style={{ height: 1, backgroundColor: '#CDCDCD' }} />);
                }}
                renderItem={({ item, index }) => (
                    <View style={{ marginVertical: wp(5), marginHorizontal: wp(4), }}>
                        <View style={{ flexDirection: "row", flex: 1, }}>
                            <Image source={{ uri: `data:image/jpeg;base64,${item.profileImage}` }} style={{ width: wp(14), height: wp(14), borderRadius: wp(100) }} />
                            <View style={{ marginLeft: wp(3), justifyContent: "center" }}>
                                <Text style={{ fontSize: 19 }}>{item.userName}</Text>
                                {/* <Text style={{ color: Colors.gray, fontSize: 12 }}>{"12 hr ago"}</Text> */}
                            </View>
                        </View>
                        <Text style={{ marginTop: 10, marginLeft: 5 }}>{item.text}</Text>
                    </View>
                )} />
            {/* {Platform.OS === 'ios' ?
                        <View style={[{ justifyContent: "center", position:"absolute", bottom:10, width:wp(100) }]}>
                            <View style={[styles.boxWithShadow, { flexDirection: "row", paddingLeft: wp(4), height: 48, alignItems: "center", paddingRight: wp(2) }]}>
                                <View style={{ flex: .12, }}>
                                    <Image source={pictureSelected ? { uri: `data:image/jpeg;base64,${Imagebase64}` } : iconPath.BLACKLOGO} style={styles.imageStyle} />

                                </View>

                                <View style={{ flex: .8}}>
                                    <TextInput placeholder={"Post something"}
                                        placeholderTextColor={Colors.Yellow}
                                        value={newMessage}
                                        onChangeText={(newMessage) => setNewMessage(newMessage)} />
                                </View>


                                <Fonticon type={"MaterialIcons"} name={"send"} size={wp(8)} color={Colors.Yellow}
                                    style={{ flex: .12 }}
                                    onPress={() => onSend()}
                                />
                            </View>
                        </View>
                : */}
                <View style={[{ flex: .15, justifyContent: "center", }]}>
                    <View style={[styles.boxWithShadow, { flexDirection: "row", paddingLeft: wp(4), height: 48, alignItems: "center", paddingRight: wp(2) }]}>
                        <View style={{ flex: .12, }}>
                            {/* <Image source={iconPath.BLACKLOGO} style={{ width: wp(8), height: wp(8), borderRadius: wp(100) }} /> */}
                            <Image source={pictureSelected ? { uri: `data:image/jpeg;base64,${Imagebase64}` } : iconPath.BLACKLOGO} style={styles.imageStyle} />

                        </View>

                        <View style={{ flex: .8, }}>
                            <TextInput placeholder={"Post something"}
                                placeholderTextColor={Colors.Yellow}
                                value={newMessage}
                                onChangeText={(newMessage) => setNewMessage(newMessage)} />
                        </View>


                        <Fonticon type={"MaterialIcons"} name={"send"} size={wp(8)} color={Colors.Yellow}
                            style={{ flex: .12 }}
                            onPress={() => onSend()}
                        />
                    </View>
                </View>

             {/* } */}

        </View >
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
export default connect(mapStateToProps, mapDispatchToProps)(ChatScreenCompany);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.White,
    },
    boxWithShadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 5,
        backgroundColor: "white",
        marginHorizontal: wp(3),
        borderRadius: 24
    },
    imageStyle: {
        width: wp(8),
        height: wp(8),
        borderRadius: wp(8)
    }
})