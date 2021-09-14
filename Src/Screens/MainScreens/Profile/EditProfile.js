import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, Pressable, Button, Platform } from 'react-native'

import { Colors } from '../../../Constants/Colors';
import { iconPath } from '../../../Constants/icon';
import { wp } from '../../../Helpers/Responsiveness';
import Fonticon from '../../../Constants/FontIcon';
import Header from '../../../Components/Header';
import Image_Picker from '../../../Components/Image_Picker';
import Loader from '../../../Components/Loader';
import Axios from '../../../Components/Axios';
import { connect } from 'react-redux';
import { TextInput, ScrollView } from 'react-native-gesture-handler';
import { SetSession } from '../../../Redux/Actions/Actions';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment'

const EditProfile = (props) => {
    const [loading, setLoading] = useState(false)
    const [fullName, setFullName] = useState('')
    const [Gender, setGender] = useState('Male')
    const [GenderEdit, setGenderEdit] = useState(false)
    const [fullNameEdit, setFullNameEdit] = useState(false)
    const [picture, setPicture] = useState("")
    const [Imagebase64, setImagebase64] = useState("")
    const [pictureSelected, setpictureSelected] = useState(false)

    const [date, setDate] = useState(new Date());
    const [DateOfBirth, setDateOfBirth] = useState('');
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    useEffect(() => {
        // ChangeName()
        // getUser()
        setValues()
    }, [])
    const setValues = () => {
        // alert(JSON.stringify(props.userData.gender))
        if (props.userData.profileImage === undefined) {
        }
        else {
            setImagebase64(props.userData.profileImage)
            setpictureSelected(true)
        }
        if (props.userData.gender === undefined) {
        }
        else {
            setGender(props.userData.gender)
        }
        if (props.userData.birthday === undefined) {
        }
        else {
            setDateOfBirth(props.userData.birthday)
        }
        setFullName(props.userData.fullName)
    }
    const getUser = () => {
        // https://mindful-leader-athlete.herokuapp.com/api/user/6113d0fe704e961da474cae7/
        fetch("https://mindful-leader-athlete.herokuapp.com/api/user/" + props.userId, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then((response) => response.json())
            .then((response) => {
                alert(JSON.stringify(response))
                // let data = {}
                // data["userId"] = response._id;
                // data["userData"] = response;
                // data["isLogin"] = true;
                // props.SessionMaintain(data)
                setLoading(false)
            })
            .catch((err) => {
                console.log(err)
                setLoading(false)
            })
    }
    const openCamera = async (type) => {
        const res = await Image_Picker(type);
        console.log("cameraaeResss\n", res.path);
        if (res === false || res === "cancel") {
            return;
        }
        setpictureSelected(true)
        await setImagebase64(res.data)
        // console.log("aaaaassssssdddd  "+JSON.stringify(res))
        setPicture(res.path)
        ChangeImage(res.data)
        // this.setState({ picture: res.path });
    }
    const ChangeImage = async (img) => {

        setLoading(true)
        let param = {};
        param["profileImage"] = img;
        console.log("hhhhhhh " + JSON.stringify(param))
        fetch("https://mindful-leader-athlete.herokuapp.com/api/user/editProfileImage/" + props.userId, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(param)
        })
            .then((response) => response.json())
            .then(async (response) => {
                // alert(JSON.stringify(response))
                let data = {}
                data["userId"] = response._id;
                data["userData"] = response;
                data["isLogin"] = true;
                await props.SessionMaintain(data)
                setLoading(false)
            })
            .catch((err) => {
                console.log(err)
                setLoading(false)
            })




    }
    const ChangeGender = async () => {
        // alert(JSON.stringify(props.userData))
        if (!GenderEdit) {
            setGenderEdit(true)
        } else {
            // alert(Gender)
            // setGenderEdit(false)
            setLoading(true)
            let param = {};
            param["gender"] = Gender;
            fetch("https://mindful-leader-athlete.herokuapp.com/api/user/editGender/" + props.userId, {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(param)
            })
                .then((response) => response.json())
                .then((response) => {
                    // alert(JSON.stringify(response.gender))
                    let data = {}
                    data["userId"] = response._id;
                    data["userData"] = response;
                    data["isLogin"] = true;
                    props.SessionMaintain(data)
                    setGenderEdit(false)
                    setLoading(false)
                })
                .catch((err) => {
                    console.log(err)
                    setLoading(false)
                })

        }

    }
    const ChangeName = async () => {
        // alert(JSON.stringify(props.userData))
        if (!fullNameEdit) {
            setFullNameEdit(true)
        } else {
            if (fullName === '') {
                alert("Please Enter name")
            } else {
                setLoading(true)
                let param = {};
                param["fullName"] = fullName;
                fetch("https://mindful-leader-athlete.herokuapp.com/api/user/editName/" + props.userId, {
                    method: 'PUT',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(param)
                })
                    .then((response) => response.json())
                    .then((response) => {
                        // alert(JSON.stringify(response._id))
                        let data = {}
                        data["userId"] = response._id;
                        data["userData"] = response;
                        data["isLogin"] = true;
                        props.SessionMaintain(data)
                        setFullNameEdit(false)
                        setLoading(false)
                    })
                    .catch((err) => {
                        console.log(err)
                        setLoading(false)
                    })
            }

        }

    }
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        setDateOfBirth(moment(currentDate).format('YYYY-MM-DD'))
        // alert(moment(currentDate).format('YYYY-MM-DD'))
        setLoading(true)
        let param = {};
        param["birthday"] = moment(currentDate).format('YYYY-MM-DD');
        fetch("https://mindful-leader-athlete.herokuapp.com/api/user/editBirthday/" + props.userId, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(param)
        })
            .then((response) => response.json())
            .then((response) => {
                // alert(JSON.stringify(response))
                let data = {}
                data["userId"] = response._id;
                data["userData"] = response;
                data["isLogin"] = true;
                props.SessionMaintain(data)
                setLoading(false)
            })
            .catch((err) => {
                console.log(err)
                setLoading(false)
            })
    };
    return (
        <View style={styles.container}>
            <Header onPress={() => props.navigation.goBack(null)} title={"Edit Profile"} />

            <ScrollView>
                <View style={{ alignItems: "center", }}>
                    <View>
                        <Image source={pictureSelected ? { uri: `data:image/jpeg;base64,${Imagebase64}` } : iconPath.BLACKLOGO} style={{ width: wp(30), height: wp(30), borderRadius: wp(30) / 2, borderWidth: 2, borderColor: Colors.Yellow, marginTop: wp(15) }} />
                        <TouchableOpacity onPress={() => openCamera("gallery")} style={{ position: "absolute", bottom: 0, right: wp(3), borderWidth: 2, borderColor: Colors.Yellow, borderRadius: 100, padding: 2, backgroundColor: Colors.Yellow }}>
                            <Fonticon type={"Entypo"} name={"camera"} size={wp(5)} color={Colors.White} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Text style={{ fontWeight: "bold", color: Colors.Black, fontSize: 18, marginTop: wp(4) }}>{fullName}</Text>
                        {/* <Fonticon type={"MaterialIcons"} name={"edit"} size={wp(6)} color={Colors.Yellow} style={{ marginLeft: wp(3), marginTop: 8 }} /> */}
                    </View>

                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: wp(10), marginHorizontal: wp(5) }}>
                    <Text style={{ color: Colors.Black, fontSize: 18, }}>Full name</Text>
                    <Fonticon type={"MaterialIcons"} name={"edit"} size={wp(5)} color={Colors.Yellow} style={{ marginLeft: wp(3), marginTop: 8 }}
                        onPress={() => ChangeName()} />
                </View>
                <TextInput style={{ marginHorizontal: wp(5), fontSize: 18, color: "black", borderBottomColor: "black", borderBottomWidth: fullNameEdit ? 1 : 0, paddingVertical: 5 }}
                    editable={fullNameEdit}
                    value={fullName}
                    onChangeText={(name) => setFullName(name)} />
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: wp(3), marginHorizontal: wp(5) }}>
                    <Text style={{ color: Colors.Black, fontSize: 18, }}>Gender</Text>
                    <Fonticon type={"MaterialIcons"} name={"edit"} size={wp(5)} color={Colors.Yellow} style={{ marginLeft: wp(3), marginTop: 8 }}
                        onPress={() => ChangeGender()} />
                </View>
                {GenderEdit ?

                    <TextInput style={{ marginHorizontal: wp(5), fontSize: 18, color: "black", borderBottomColor: "black", borderBottomWidth: GenderEdit ? 1 : 0, paddingVertical: 5 }}
                        editable={GenderEdit}
                        value={Gender}
                        onChangeText={(name) => setGender(name)} />
                    // <View style={{ flexDirection: "row", justifyContent: "space-evenly", paddingVertical: 5 }}>
                    //     <Pressable style={{ flexDirection: "row" }} onPress={() => setGender("Male")}>
                    //         <Fonticon type={"Ionicons"} name={Gender === "Male" ? 'radio-button-on' : 'radio-button-off'} size={20} color={Colors.Yellow} />
                    //         <Text style={{ fontSize: 16, padding: 0, color: Colors.black, marginLeft: wp(1) }}>{"Male"}</Text>
                    //     </Pressable>
                    //     <Pressable style={{ flexDirection: "row" }} onPress={() => setGender("Female")}>
                    //         <Fonticon type={"Ionicons"} name={Gender === "Male" ? 'radio-button-off' : 'radio-button-on'} size={20} color={Colors.Yellow} />
                    //         <Text style={{ fontSize: 16, padding: 0, color: Colors.black, marginLeft: wp(1) }}>{"Female"}</Text>
                    //     </Pressable>
                    // </View>
                    :
                    <Text style={{ marginHorizontal: wp(5), fontSize: 18, color: "black", paddingVertical: 5 }}>{Gender}</Text>
                }
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: wp(3), marginHorizontal: wp(5) }}>
                    <Text style={{ color: Colors.Black, fontSize: 18, }}>Birthday</Text>
                    <Fonticon type={"MaterialIcons"} name={"edit"} size={wp(5)} color={Colors.Yellow} style={{ marginLeft: wp(3), marginTop: 8 }}
                        onPress={() => setShow(true)} />
                </View>

                <Text style={{ marginHorizontal: wp(5), fontSize: 17, color: "black", paddingVertical: 5 }}>{DateOfBirth}</Text>

                <View>
                    {/* <View>
                    <Button onPress={showMode} title="Show date picker!" />
                </View> */}
                    {show && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode={'date'}
                            maximumDate={new Date()}
                            display="default"
                            onChange={onChange}
                        />
                    )}
                </View>
            </ScrollView>
            <Loader loading={loading} />

        </View>
    )
}

const mapStateToProps = (state) => {
    return {
        userId: state.AuthReducer.userId,
        userData: state.AuthReducer.userData,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        SessionMaintain: (data) => dispatch(SetSession(data)),
        SetCompanies: (data) => dispatch(SetCompanies(data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.White
    },
    headerStyle: {
        backgroundColor: '#fff',
        height: wp(20),
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 5,
        flexDirection: "row",
        alignItems: "center",
    },
    imageStyle: {
        width: wp(10),
        height: wp(10),
        borderRadius: wp(10) / 2
    },
    bottomContainer:
    {
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 1, height: -10 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 10,
        flex: 1.3,
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
    }

})