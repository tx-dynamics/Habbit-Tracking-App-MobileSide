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

const Login = (props) => {
    const [secureTextEntry, setSecureTextEntry] = useState(true)
    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState(false)
    const [InvalidemailError, setInvalidemailError] = useState(false)
    const [password, setPassword] = useState('')
    const [passwordError, setPasswordError] = useState(false)
    const [apiError, setapiError] = useState(false)
    const [apiErrorMsg, setapiErrorMsg] = useState('')
    const [loading, setLoading] = useState(false)

    const LoginUser = async () => {
        setEmailError(false)
        setInvalidemailError(false)
        setPasswordError(false)
        setapiError(false)
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (email === '')
            setEmailError(true)
        else if (reg.test(email) === false)
            setInvalidemailError(true)
        else if (password === '')
            setPasswordError(true)
        else {
            setLoading(true)
            let param = {};
            param["email"] = email;
            param["password"] = password;
            await Axios("user/login", param, 'POST').then(async (response) => {
                alert(JSON.stringify(response))
                if (response.error === undefined) {
                    let data = {}
                    data["userId"] = response._id;
                    data["userData"] = response;
                    data["isLogin"] = true;
                    props.SessionMaintain(data)
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

    return (
        <View style={styles.container}>
            <ScrollView style={{flex:1}}>

            <View style={{ flex: .6, marginHorizontal: wp(5) }}>
                <Image source={iconPath.BLACKLOGO} style={styles.LogoStyle} />
                <View style={styles.titleView}>
                    <Text style={styles.WelcomeStyle}>Welcome back!</Text>
                    <Text>Enter email & password to continue</Text>
                </View>
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
                <InputField placeholder={"Password"}
                    secureText
                    secureTextEntry={secureTextEntry}
                    onPress={() => setSecureTextEntry(!secureTextEntry)}
                    value={password}
                    onChangeText={password => setPassword(password)}
                />
                {passwordError &&
                    <Text style={{ fontSize: 12, color: "red" }}>{"Please Enter Password"}</Text>
                }
                <Text style={{ alignSelf: "flex-end", marginTop: wp(1) }}>Forgot Password?</Text>
                {apiError &&
                    <Text style={{ fontSize: 12, color: "red", textAlign: "center" }}>{apiErrorMsg}</Text>
                }
                <Button title={"Log In"} style={{ marginTop: wp(9) }}
                    onPress={() => LoginUser()} />
                <Text onPress={() => props.navigation.navigate("SignUp")} style={{ alignSelf: "center", marginTop: wp(5) }}>New here? Sign Up</Text>
            </View>
            </ScrollView>

            <Loader loading={loading} />

        </View>
    )
}
const mapDispatchToProps = (dispatch) => {
    return {
        SessionMaintain: (data) => dispatch(SetSession(data))
    }
}
export default connect(null, mapDispatchToProps)(Login);
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
        marginTop:wp(5)
    },
    WelcomeStyle: {
        fontSize: 30,
        fontWeight: "bold",
        color: Colors.Yellow,
        // fontFamily: fonts.Poppins
    }
})