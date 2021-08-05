import React from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'


import { Colors } from '../../../Constants/Colors';
import { iconPath } from '../../../Constants/icon';
import { wp } from '../../../Helpers/Responsiveness';
import Fonticon from '../../../Constants/FontIcon';
import InputField from '../../../Components/InputField';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Button from '../../../Components/Button';
import Header from '../../../Components/Header';


export default function ChangePassword(props) {

    return (
        <View style={styles.container}>
            <Header onPress={() => props.navigation.goBack(null)} title={"Change Password"} />
            <View style={{ marginHorizontal: wp(5), marginTop: wp(10) }}>
                <Text style={{ fontSize: 16 }}>You can change your password here</Text>
                <InputField placeholder={"Current password"} marginTop={20} />
                <InputField placeholder={"Enter new password"} marginTop={15} />
                <InputField placeholder={"Confirm new password"} marginTop={15} />

                <Button title={"Save"} style={{ marginTop: wp(9) }} />

            </View>
        </View>
    )
}
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
