import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, StatusBar } from 'react-native'

import { Colors } from '../../Constants/Colors';
import { iconPath } from '../../Constants/icon';
import { wp } from '../../Helpers/Responsiveness';
import InputField from '../../Components/InputField';
import Button from '../../Components/Button';

const SignUp = (props) => {
    const [securePassword, setSecurePassword] = useState(true)
    const [secureCpassword, setSecureCpassword] = useState(true)
    return (
        <View style={styles.container}>
            <View style={{ flex: .6, marginHorizontal: wp(5) }}>
                <Image source={iconPath.BLACKLOGO} style={styles.LogoStyle} />
                <View style={styles.titleView}>
                    <Text style={styles.WelcomeStyle}>Welcome back!</Text>
                    <Text>Create an account to continue</Text>
                </View>
            </View>
            <View style={{ flex: 1, marginHorizontal: wp(5) }}>
                <InputField placeholder={"Full name"} />
                <InputField placeholder={"Email"} keyboardType="email-address" />
                <InputField placeholder={"Password"}
                    secureText
                    secureTextEntry={securePassword}
                    onPress={() => setSecurePassword(!securePassword)}
                />
                <InputField placeholder={"Confirm password"}
                    secureText
                    secureTextEntry={secureCpassword}
                    onPress={() => setSecureCpassword(!secureCpassword)}
                />
                <Text style={{ alignSelf: "flex-end", marginTop: wp(1) }}>Forgot Password?</Text>
                <Button title={"Sign Up"} style={{ marginTop: wp(9) }} onPress={() => props.navigation.navigate("LastStep")} />
                <Text style={{ alignSelf: "center", marginTop: wp(5) }}>Already have an account?</Text>
            </View>
        </View>
    )
}
export default SignUp;
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
        marginBottom: wp(5)
    },
    WelcomeStyle: {
        fontSize: 25,
        fontWeight: "bold",
        color: Colors.Yellow
    }
})