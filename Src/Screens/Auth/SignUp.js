import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, ScrollView, Pressable } from 'react-native'

import { Colors } from '../../Constants/Colors';
import { iconPath } from '../../Constants/icon';
import { wp } from '../../Helpers/Responsiveness';
import InputField from '../../Components/InputField';
import Button from '../../Components/Button';
import Loader from '../../Components/Loader';
import Axios from '../../Components/Axios';
import { connect } from 'react-redux';
import { SetSession, SetCompanies } from '../../Redux/Actions/Actions';

const SignUp = (props) => {
    const [securePassword, setSecurePassword] = useState(true)
    const [secureCpassword, setSecureCpassword] = useState(true)
    const [fullName, setFullName] = useState('')
    const [fullNameError, setFullNameError] = useState(false)
    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState(false)
    const [InvalidemailError, setInvalidemailError] = useState(false)
    const [password, setPassword] = useState('')
    const [passwordError, setPasswordError] = useState(false)
    const [confirmPassword, setConfirmPassword] = useState('')
    const [confirmPasswordError, setConfirmPasswordError] = useState(false)
    const [apiError, setapiError] = useState(false)
    const [apiErrorMsg, setapiErrorMsg] = useState('')
    const [loading, setLoading] = useState(false)

    const RegisterUser = async () => {
        // this.setState({ loading: true })
        setFullNameError(false)
        setEmailError(false)
        setInvalidemailError(false)
        setPasswordError(false)
        setConfirmPasswordError(false)
        setapiError(false)
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (fullName === '')
            setFullNameError(true)
        else if (email === '')
            setEmailError(true)
        else if (reg.test(email) === false)
            setInvalidemailError(true)
        else if (password === '')
            setPasswordError(true)
        else {
            if (password !== confirmPassword) {
                setConfirmPasswordError(true)
            }
            else {
                setLoading(true)
                let param = {};
                param["fullName"] = fullName;
                param["email"] = email;
                param["password"] = password;
                await Axios("user/signup", param, 'POST').then(async (response) => {
                    if (response.error === undefined) {
                        let data = {}
                        data["userId"] = response.user._id;
                        data["userData"] = response;
                        data["isLogin"] = false;
                        props.SessionMaintain(data)
                        props.SetCompanies({ "CompanyData": response.company })
                        props.navigation.navigate("LastStep")
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
            <ScrollView>

                <View style={{ flex: .6, marginHorizontal: wp(5) }}>
                    <Image source={iconPath.BLACKLOGO} style={styles.LogoStyle} />
                    <View style={styles.titleView}>
                        <Text style={styles.WelcomeStyle}>Welcome back!</Text>
                        <Text>Create an account to continue</Text>
                    </View>
                </View>
                <View style={{ flex: 1, marginHorizontal: wp(5) }}>
                    <InputField placeholder={"Full name"}
                        value={fullName}
                        onChangeText={fullName => setFullName(fullName)}
                    />
                    {fullNameError &&
                        <Text style={{ fontSize: 12, color: "red" }}>{"Please Enter Name"}</Text>
                    }
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
                        secureTextEntry={securePassword}
                        onPress={() => setSecurePassword(!securePassword)}
                        value={password}
                        onChangeText={password => setPassword(password)}
                    />
                    {passwordError &&
                        <Text style={{ fontSize: 12, color: "red" }}>{"Please Enter Password"}</Text>
                    }
                    <InputField placeholder={"Confirm password"}
                        secureText
                        secureTextEntry={secureCpassword}
                        onPress={() => setSecureCpassword(!secureCpassword)}
                        value={confirmPassword}
                        onChangeText={confirmPassword => setConfirmPassword(confirmPassword)}
                    />
                    {confirmPasswordError &&
                        <Text style={{ fontSize: 12, color: "red" }}>{"Password Not same"}</Text>
                    }
                    <Pressable onPress={() => props.navigation.navigate("ForgotPassword")}>
                        <Text style={{ alignSelf: "flex-end", marginTop: wp(1) }}>Forgot Password?</Text>
                    </Pressable>
                    {apiError &&
                        <Text style={{ fontSize: 12, color: "red", textAlign: "center" }}>{apiErrorMsg}</Text>
                    }
                    <Button title={"Sign Up"} style={{ marginTop: wp(9) }}
                        //  onPress={() => props.navigation.navigate("LastStep")}
                        onPress={() => RegisterUser()}
                    />
                    <Pressable onPress={() => props.navigation.navigate("Login")}>
                        <Text style={{ alignSelf: "center", marginTop: wp(5) }}>Already have an account?</Text>
                    </Pressable>
                </View>
            </ScrollView>

            <Loader loading={loading} />
        </View>
    )
}
const mapDispatchToProps = (dispatch) => {
    return {
        SessionMaintain: (data) => dispatch(SetSession(data)),
        SetCompanies: (data) => dispatch(SetCompanies(data))
    }
}
export default connect(null, mapDispatchToProps)(SignUp);
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
        fontSize: 25,
        fontWeight: "bold",
        color: Colors.Yellow
    }
})