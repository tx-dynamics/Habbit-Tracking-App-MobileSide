import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'

import { Colors } from '../../../Constants/Colors';
import { iconPath } from '../../../Constants/icon';
import { wp } from '../../../Helpers/Responsiveness';
import Fonticon from '../../../Constants/FontIcon';
import Header from '../../../Components/Header';

export default function EditProfile(props) {
    return (
        <View style={styles.container}>
            <Header onPress={() => props.navigation.goBack(null)} title={"Edit Profile"} />

            <View style={{ alignItems: "center", }}>
                <View>
                    <Image source={iconPath.BLACKLOGO} style={{ width: wp(30), height: wp(30), borderRadius: wp(30) / 2, borderWidth: 2, borderColor: Colors.Yellow, marginTop: wp(15) }} />
                    <Image source={iconPath.BLACKLOGO} style={{ width: wp(6), height: wp(6), borderRadius: wp(6) / 2, position: "absolute", bottom: 0, right: wp(3), borderWidth: 2, borderColor: Colors.Yellow, }} />
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={{ fontWeight: "bold", color: Colors.Black, fontSize: 18, marginTop: wp(4) }}>James Vinci</Text>
                    <Fonticon type={"MaterialIcons"} name={"edit"} size={wp(6)} color={Colors.Yellow} style={{ marginLeft: wp(3), marginTop: 8 }} />
                </View>

            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop:wp(10), marginHorizontal:wp(5) }}>
                <Text style={{ color: Colors.Black, fontSize: 18, marginTop: wp(4) }}>Full name</Text>
                <Fonticon type={"MaterialIcons"} name={"edit"} size={wp(5)} color={Colors.Yellow} style={{ marginLeft: wp(3), marginTop: 8 }} />
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop:wp(3), marginHorizontal:wp(5) }}>
                <Text style={{ color: Colors.Black, fontSize: 18, marginTop: wp(4) }}>Gender</Text>
                <Fonticon type={"MaterialIcons"} name={"edit"} size={wp(5)} color={Colors.Yellow} style={{ marginLeft: wp(3), marginTop: 8 }} />
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop:wp(3), marginHorizontal:wp(5) }}>
                <Text style={{ color: Colors.Black, fontSize: 18, marginTop: wp(4) }}>Birthday</Text>
                <Fonticon type={"MaterialIcons"} name={"edit"} size={wp(5)} color={Colors.Yellow} style={{ marginLeft: wp(3), marginTop: 8 }} />
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