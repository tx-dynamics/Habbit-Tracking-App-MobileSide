import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'

import { Colors } from '../../../Constants/Colors';
import { iconPath } from '../../../Constants/icon';
import { wp } from '../../../Helpers/Responsiveness';
import Fonticon from '../../../Constants/FontIcon';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Header from '../../../Components/Header';
import ProfileButtons from './profileButtons';

export default function Profile(props) {
    return (
        <View style={styles.container}>
            <Header onPress={() => props.navigation.goBack(null)} title={"Profile"} />
            
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Image source={iconPath.BLACKLOGO} style={{ width: wp(30), height: wp(30), borderRadius: wp(30) / 2, borderWidth: 2, borderColor: Colors.Yellow, marginTop: wp(-10) }} />
                <Text style={{ fontWeight: "bold", color: Colors.Yellow, fontSize: 18, marginTop: wp(4) }}>James Vinci</Text>
                <Text style={{ width: wp(50), textAlign: "center" }}>POD Lorem Ipsum is simply dummy text of the</Text>
            </View>
            <View style={styles.bottomContainer}>
                <ProfileButtons icon={iconPath.EditProfile} onPress={() =>props.navigation.navigate("EditProfile")} name={"Edit your Profile"}/>
                <ProfileButtons icon={iconPath.Settings} onPress={() =>props.navigation.navigate("Settings")} name={"Settings"}/>
            </View>
        </View>
    )
}
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
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 10,
        flex: 1.3,
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        paddingVertical:wp(10)
    }

})