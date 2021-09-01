import React, { useState } from 'react'
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native'


import { Colors } from '../../../Constants/Colors';
import { iconPath } from '../../../Constants/icon';
import { wp } from '../../../Helpers/Responsiveness';
import Fonticon from '../../../Constants/FontIcon';
import InputField from '../../../Components/InputField';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Button from '../../../Components/Button';
import Header from '../../../Components/Header';
import Loader from '../../../Components/Loader';
import Axios from '../../../Components/Axios';
import { connect } from 'react-redux';
import { SetSession } from '../../../Redux/Actions/Actions';


const ChangePassword = (props) => {
    const [currentPassword, setCurrentPassword] = useState('')
    const [currentPasswordError, setCurrentPasswordError] = useState(false)
    const [password, setPassword] = useState('')
    const [passwordError, setPasswordError] = useState(false)
    const [confirmPassword, setConfirmPassword] = useState('')
    const [confirmPasswordError, setConfirmPasswordError] = useState(false)
    const [apiError, setapiError] = useState(false)
    const [apiErrorMsg, setapiErrorMsg] = useState('')
    const [loading, setLoading] = useState(false)

    const ChangePasswordApi = async () => {
        setCurrentPasswordError(false)
        setPasswordError(false)
        setConfirmPasswordError(false)
        setapiError(false)
        if (currentPassword === '') {
            setCurrentPasswordError(true)
        } else if (password === '')
            setPasswordError(true)
        else {
            if (password !== confirmPassword) {
                setConfirmPasswordError(true)
            }
            else {
                setLoading(true)
                let param = {};
                param["id"] = props.userId;
                param["currentPassword"] = currentPassword;
                param["newPassword"] = password;
                await Axios("user/change-password/", param, 'PUT').then(async (response) => {
                    if (response.error === undefined) {
                        let data = {}
                        data["userId"] = response._id;
                        data["userData"] = response;
                        data["isLogin"] = true;
                        props.SessionMaintain(data)
                        alert("Password Changed")
                        setCurrentPassword('')
                        setPassword('')
                        setConfirmPassword('')
                    } else {
                        setapiError(true)
                        setapiErrorMsg(response.error)
                    }
                    setLoading(false)
                })
                    .catch((err) => {
                        console.warn(err)
                        setLoading(false)
                    })
            }
        }
    }
    return (
        <View style={styles.container}>
            <Header onPress={() => props.navigation.goBack(null)} title={"Change Password"} />
            <View style={{ marginHorizontal: wp(5), marginTop: wp(10) }}>
                <Text style={{ fontSize: 16 }}>You can change your password here</Text>
                <InputField placeholder={"Current password"} marginTop={20}
                    value={currentPassword}
                    onChangeText={currentPassword => setCurrentPassword(currentPassword)} />
                {currentPasswordError &&
                    <Text style={{ fontSize: 12, color: "red" }}>{"Please Enter Current Password"}</Text>
                }
                <InputField placeholder={"Enter new password"} marginTop={15}
                    value={password}
                    onChangeText={password => setPassword(password)} />
                {passwordError &&
                    <Text style={{ fontSize: 12, color: "red" }}>{"Please Enter Password"}</Text>
                }
                <InputField placeholder={"Confirm new password"} marginTop={15}
                    value={confirmPassword}
                    onChangeText={confirmPassword => setConfirmPassword(confirmPassword)} />
                {confirmPasswordError &&
                    <Text style={{ fontSize: 12, color: "red" }}>{"Password Not same"}</Text>
                }

                {apiError &&
                    <Text style={{ fontSize: 12, color: "red", textAlign: "center" }}>{apiErrorMsg}</Text>
                }

                <Button title={"Save"} style={{ marginTop: wp(9) }}
                    onPress={() =>ChangePasswordApi()} />

            </View>
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
        SessionMaintain: (data) => dispatch(SetSession(data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
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

})
