import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'

import { Colors } from '../../../Constants/Colors';
import { iconPath } from '../../../Constants/icon';
import { wp } from '../../../Helpers/Responsiveness';
import Fonticon from '../../../Constants/FontIcon';
import Header from '../../../Components/Header';
import Image_Picker from '../../../Components/Image_Picker';

export default function EditProfile(props) {

    const [picture, setPicture] = useState("")
    const [pictureSelected, setpictureSelected] = useState(false)

    const openCamera = async (type) => {
        const res = await Image_Picker(type);
        console.log("cameraaeResss\n", res.path);
        if (res === false || res === "cancel") {
            return;
        }
        setpictureSelected(true)
        setPicture(res.path)
        // this.setState({ picture: res.path });
    };

    return (
        <View style={styles.container}>
            <Header onPress={() => props.navigation.goBack(null)} title={"Edit Profile"} />

            <View style={{ alignItems: "center", }}>
                <View>
                    <Image source={pictureSelected ? { uri: picture } : iconPath.BLACKLOGO} style={{ width: wp(30), height: wp(30), borderRadius: wp(30) / 2, borderWidth: 2, borderColor: Colors.Yellow, marginTop: wp(15) }} />
                    <TouchableOpacity onPress={() => openCamera("gallery")} style={{ position: "absolute", bottom: 0, right: wp(3), borderWidth: 2, borderColor: Colors.Yellow, borderRadius: 100, padding: 2, backgroundColor: Colors.Yellow }}>
                        <Fonticon type={"Entypo"} name={"camera"} size={wp(5)} color={Colors.White} />
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={{ fontWeight: "bold", color: Colors.Black, fontSize: 18, marginTop: wp(4) }}>James Vinci</Text>
                    <Fonticon type={"MaterialIcons"} name={"edit"} size={wp(6)} color={Colors.Yellow} style={{ marginLeft: wp(3), marginTop: 8 }} />
                </View>

            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: wp(10), marginHorizontal: wp(5) }}>
                <Text style={{ color: Colors.Black, fontSize: 18, marginTop: wp(4) }}>Full name</Text>
                <Fonticon type={"MaterialIcons"} name={"edit"} size={wp(5)} color={Colors.Yellow} style={{ marginLeft: wp(3), marginTop: 8 }} />
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: wp(3), marginHorizontal: wp(5) }}>
                <Text style={{ color: Colors.Black, fontSize: 18, marginTop: wp(4) }}>Gender</Text>
                <Fonticon type={"MaterialIcons"} name={"edit"} size={wp(5)} color={Colors.Yellow} style={{ marginLeft: wp(3), marginTop: 8 }} />
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: wp(3), marginHorizontal: wp(5) }}>
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