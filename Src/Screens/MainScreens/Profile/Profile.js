import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'

import { Colors } from '../../../Constants/Colors';
import { iconPath } from '../../../Constants/icon';
import { wp } from '../../../Helpers/Responsiveness';
import Fonticon from '../../../Constants/FontIcon';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Header from '../../../Components/Header';
import ProfileButtons from './profileButtons';
import { SetSession } from '../../../Redux/Actions/Actions';
import { connect } from 'react-redux';

const Profile = (props) => {

    const [Imagebase64, setImagebase64] = useState("")
    const [pictureSelected, setpictureSelected] = useState(false)
    const [fullName, setFullName] = useState('')

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
        setFullName(props.userData.fullName)
    }

    const logout = () => {
        let data = {}
        data["userId"] = "";
        data["userData"] = '';
        data["isLogin"] = false;
        props.SessionMaintain(data)
    }
    return (
        <View style={styles.container}>
            <Header onPress={() => props.navigation.goBack(null)} title={"Profile"} />

            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                {/* <Image source={iconPath.BLACKLOGO} style={{ width: wp(30), height: wp(30), borderRadius: wp(30) / 2, borderWidth: 2, borderColor: Colors.Yellow, marginTop: wp(-10) }} /> */}
                <Image source={pictureSelected ? { uri: `data:image/jpeg;base64,${Imagebase64}` } : iconPath.BLACKLOGO} style={{ width: wp(30), height: wp(30), borderRadius: wp(30) / 2, borderWidth: 2, borderColor: Colors.Yellow, marginTop: wp(15) }} />
                <Text style={{ fontWeight: "bold", color: Colors.Yellow, fontSize: 18, marginTop: wp(4) }}>{fullName}</Text>
                <Text style={{ width: wp(50), textAlign: "center" }}></Text>
            </View>
            <View style={styles.bottomContainer}>
                <ProfileButtons icon={iconPath.EditProfile} onPress={() => props.navigation.navigate("EditProfile")} name={"Edit your Profile"} />
                <ProfileButtons icon={iconPath.Settings} onPress={() => props.navigation.navigate("Settings")} name={"Settings"} />
                <ProfileButtons icon={iconPath.Settings}
                    onPress={() => logout()}
                    name={"Log out"}
                />
            </View>
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.White
    },
    bottomContainer:
    {
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 1, height: -10 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 10,
        flex: 1.3,
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        paddingVertical: wp(10)
    }

})