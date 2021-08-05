import React from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'


import { Colors } from '../../../Constants/Colors';
import Header from '../../../Components/Header';
import { iconPath } from '../../../Constants/icon';
import { wp } from '../../../Helpers/Responsiveness';
import Fonticon from '../../../Constants/FontIcon';

const DATA = [
    { "title": "Change Password", "id": "1" },
    { "title": "Privacy Policy", "id": "2" },
    { "title": "Help Center", "id": "3" },
]

export default function Settings(props) {

    const Navi = (id) => {
        if (id === "1") {
            props.navigation.navigate("ChangePassword")

        } else if (id === "2") {

        } else if (id === "3") {

        }
    }

    return (
        <View style={styles.container}>
            <Header onPress={() => props.navigation.goBack(null)} title={"Settings"} />
            
            {DATA.map((item) =>
                <Pressable onPress={() => Navi(item.id)}
                    style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: wp(5), marginTop: wp(10), borderBottomColor: Colors.LightGray, borderBottomWidth: 1, paddingBottom: 8 }}>
                    <Text style={{ fontSize: 16 }}>{item.title}</Text>
                    <Fonticon type={"AntDesign"} name={"right"} size={wp(5)} color={Colors.Black} />
                </Pressable>
            )}

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
