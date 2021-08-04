import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, StatusBar } from 'react-native'

import { Colors } from '../../Constants/Colors';
import { iconPath } from '../../Constants/icon';
import { wp } from '../../Helpers/Responsiveness';
import InputField from '../../Components/InputField';
import Button from '../../Components/Button';

const Login = (props) => {
    const [secureTextEntry, setSecureTextEntry] = useState(true)
    return (
        <View style={styles.container}>
            <View style={{ flex: .6, marginHorizontal: wp(5) }}>
                <Image source={iconPath.BLACKLOGO} style={styles.LogoStyle} />
                <View style={styles.titleView}>
                    <Text style={styles.WelcomeStyle}>Welcome back!</Text>
                    <Text>Enter email & password to continue</Text>
                </View>
            </View>
            <View style={{ flex: 1, marginHorizontal: wp(5) }}>
                <InputField placeholder={"Email"} keyboardType="email-address"/>
                <InputField placeholder={"Password"}
                    secureText
                    secureTextEntry={secureTextEntry}
                    onPress={() => setSecureTextEntry(!secureTextEntry)}
                />
                <Text style={{ alignSelf: "flex-end", marginTop: wp(1) }}>Forgot Password?</Text>
                <Button title={"Log In"} style={{ marginTop: wp(9) }} />
                <Text onPress={() => props.navigation.navigate("SignUp")} style={{ alignSelf: "center", marginTop: wp(5) }}>New here? Sign Up</Text>
            </View>
        </View>
    )
}
export default Login;
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