import React, { useState } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'

import { Colors } from '../../Constants/Colors';
import { iconPath } from '../../Constants/icon';
import { wp } from '../../Helpers/Responsiveness';
import { fonts } from '../../Constants/Fonts';
import InputField from '../../Components/InputField';
import Button from '../../Components/Button';
import Loader from '../../Components/Loader';
import Axios from '../../Components/Axios';
import { connect } from 'react-redux';
import { SetSession } from '../../Redux/Actions/Actions';
import { ScrollView } from 'react-native-gesture-handler';
import NewAlert from '../../Components/NewAlert';

const ForgotPassword = (props) => {
    const [secureTextEntry, setSecureTextEntry] = useState(true)
    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState(false)
    const [InvalidemailError, setInvalidemailError] = useState(false)
    const [password, setPassword] = useState('')
    const [passwordError, setPasswordError] = useState(false)
    const [apiError, setapiError] = useState(false)
    const [apiErrorMsg, setapiErrorMsg] = useState('')
    const [loading, setLoading] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    const [alertText, setalertText] = useState('')

    const forgotPassword = async () => {

        let param = {};
        param["email"] = email;
        setLoading(true)
// 
        await Axios("user/forgotPassword", param, 'POST').then(async (response) => {
            // alert(JSON.stringify(response))
            // if (response.error === undefined) {
            //     let data = {}
            //     data["userId"] = response._id;
            //     data["userData"] = response;
            //     data["isLogin"] = true;
            //     props.SessionMaintain(data)
            // } else {
            //     setapiError(true)
            //     setapiErrorMsg(response.error)
            // }
            setalertText("Email containing your new password has been sent")
            setShowAlert(true)
            setLoading(false)
        })
            .catch((err) => {
                // console.warn(err)
                setalertText("Email containing your new password has been sent")
                setShowAlert(true)
                setEmail('')
                setLoading(false)
            })

    }

    return (
        <View style={styles.container}>
            <ScrollView style={{ flex: 1 }}>

                <View style={{ flex: .6, marginHorizontal: wp(5) }}>
                    <Image source={iconPath.BLACKLOGO} style={styles.LogoStyle} />
                
                </View>
                <View style={{ flex: 1, marginHorizontal: wp(5) }}>
                    <InputField placeholder={"Email"} keyboardType="email-address"
                        value={email}
                        onChangeText={email => setEmail(email)} />
                    {emailError &&
                        <Text style={{ fontSize: 12, color: "red" }}>{"Please Enter Email"}</Text>
                    }
                    {InvalidemailError &&
                        <Text style={{ fontSize: 12, color: "red" }}>{"Invalid Email Address"}</Text>
                    }
                  
                    {apiError &&
                        <Text style={{ fontSize: 12, color: "red", textAlign: "center" }}>{apiErrorMsg}</Text>
                    }
                    <Button title={"Submit"} style={{ marginTop: wp(9) }}
                        onPress={() => forgotPassword()} 
                        />
                </View>
            </ScrollView>

            <Loader loading={loading} />

            <NewAlert show={showAlert}
                text={alertText}
                onPressOk={() => setShowAlert(false)} />
        </View>
    )
}
const mapDispatchToProps = (dispatch) => {
    return {
        SessionMaintain: (data) => dispatch(SetSession(data))
    }
}
export default connect(null, mapDispatchToProps)(ForgotPassword);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.White,
    },
    LogoStyle: {
        width: wp(35),
        height: wp(35),
        resizeMode: "contain",
        alignSelf: "center",
        marginTop: wp(15)
    },
    titleView: {
        justifyContent: "flex-end",
        flex: 1,
        marginBottom: wp(5),
        marginTop: wp(5)
    },
    WelcomeStyle: {
        fontSize: 30,
        fontWeight: "bold",
        color: Colors.Yellow,
        // fontFamily: fonts.Poppins
    }
})