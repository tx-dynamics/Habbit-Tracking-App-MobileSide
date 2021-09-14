import React, { useState, useEffect } from 'react';
import {
    View, Text, FlatList, StyleSheet, Image, TextInput, Platform,
    KeyboardAvoidingView, ScrollView, Keyboard, Pressable, Modal
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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


const ENDPOINT = "https://mindful-leader-athlete.herokuapp.com";
var socket;

const ChatScreenDepartment = (props) => {
    const [messages, setMessages] = useState('');
    const [newMessage, setNewMessage] = useState('')
    const [pictureSelected, setpictureSelected] = useState(false)
    const [Imagebase64, setImagebase64] = useState("")
    const [ImageModelShow, setImageModelShow] = useState(false)
    const [base64ImageFull, setBase64ImageFull] = useState('')

    const getAllMessages = async () => {
        fetch(BaseUrl + "message/" + props.userData.department, {
            method: 'GET',
            headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        })
            .then((response) => response.json())
            .then((response) => {
                setMessages(response.reverse())
            })
            .catch((err) => { console.log(err) })
    };

    useEffect(() => {
        socket = io(ENDPOINT);
        // alert(JSON.stringify(props.userData.department))
        let roomId = props.userData.department;
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

    const setValues = async() => {
        if (props.userData.profileImage === undefined) {
        }
        else {
        // alert(JSON.stringify(props.userData.profileImage))
           await setImagebase64(props.userData.profileImage)
            setpictureSelected(true)
        }
    }

    useEffect(() => {
        // socket.on("message", (message) => {
        //     console.log("Recieve Message: ", message);

        //     setMessages((messages) => [...messages, message]);

        // });
        let count =0;
        socket.off('message').on('message', (message) => {
            // console.log("aaaaaasssss", message);
        setMessages((messages) => [...messages, message]);
        // alert(count++)
        }
         );
    }, []);

    const openCamera = async (type) => {
        const res = await Image_Picker(type);
        console.log("cameraaeResss\n", res.path);
        if (res === false || res === "cancel") {
            return;
        }
        // setpictureSelected(true)
        // await setImagebase64(res.data)
        // console.log("aaaaassssssdddd  "+JSON.stringify(res.path))
        // setPicture(res.path)
        // ChangeImage(res.data)
        // this.setState({ picture: res.path });
        onSendImage(res.data)
    }

    const onSendImage = (base64) => {
        let data = {}
        data["type"] = "photo";
        data["text"] = base64;
        // console.log("hgjkghghggh "+JSON.stringify(data))
        socket.emit("sendMessage", data, (res) => { });
    };
    const onSend = () => {
        if (newMessage !== '') {
            let data = {}
            data["type"] = "text";
            data["text"] = newMessage;
            socket.emit("sendMessage", data, (res) => { });
            setNewMessage('')
        }
    };
    const fullImage = (base64) => {
        setBase64ImageFull(base64)
        setImageModelShow(true)
    }

    return (

        <KeyboardAwareScrollView style={styles.container}
        contentContainerStyle={{ flex: 1 }}
    // behavior={Platform.OS === "ios" ? "padding" : null}
    >
        <View style={{ flex: .88 }}>
            <FlatList
                style={{ flex: 1, }}
                data={messages}
                extraData={messages}
                inverted
                showsVerticalScrollIndicator={false}
                // contentContainerStyle={{marginTop:wp(20)}}
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
                        {item.type === "photo" ?
                            <Pressable onPress={() => fullImage(item.text)}>
                                <Image source={{ uri: `data:image/jpeg;base64,${item.text}` }} style={{ width: wp(28), height: wp(50), borderRadius: wp(4), resizeMode: "contain" }} />
                            </Pressable>
                            :
                            <Text style={{ marginTop: 10, marginLeft: 5 }}>{item.text}</Text>
                        }
                    </View>
                )} />


        </View>
        <View style={{ flex: .12 }}>
            <View style={[{ justifyContent: "center" }]}>
                <View style={[styles.boxWithShadow, { flexDirection: "row", paddingLeft: wp(4), height: 48, alignItems: "center", paddingRight: wp(2) }]}>
                    <Pressable style={{ flex: .12, }}
                        onPress={() => openCamera("gallery")}>
                        <Image source={pictureSelected ? { uri: `data:image/jpeg;base64,${Imagebase64}` } : iconPath.BLACKLOGO} style={styles.imageStyle} />
                    </Pressable>
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

        </View>

        <Modal
            transparent={true}
            animationType={'none'}
            // visible={true}
            visible={ImageModelShow}
            onRequestClose={() => { setImageModelShow(false) }}>
            <View style={{ flex: 1, backgroundColor: "white" }}>
                <Image source={{ uri: `data:image/jpeg;base64,${base64ImageFull}` }} style={{ width: "100%", height: "100%", resizeMode:"contain" }} />
                <Pressable onPress={() => setImageModelShow(false)}
                    style={{ position: "absolute", top: 10, right: 10 }}>
                    <Fonticon type={"Entypo"} name={"circle-with-cross"} size={wp(8)} color={Colors.Yellow}
                        style={{ flex: .12 }}
                    />
                </Pressable>
            </View>
        </Modal>

    </KeyboardAwareScrollView >

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
export default connect(mapStateToProps, mapDispatchToProps)(ChatScreenDepartment);
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