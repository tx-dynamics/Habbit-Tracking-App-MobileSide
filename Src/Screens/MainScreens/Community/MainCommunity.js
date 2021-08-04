import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'

import ChatTopBar from '../../../Navigation/TopBar/ChatTopBar';
import { Colors } from '../../../Constants/Colors';
import { iconPath } from '../../../Constants/icon';
import { wp } from '../../../Helpers/Responsiveness';
import Fonticon from '../../../Constants/FontIcon';

export default function MainCommunity() {
    return (
        <View style={styles.container}>

            <View style={styles.headerStyle}>
                <View style={{ flex: .5, paddingLeft: wp(3), flexDirection: "row", alignItems: "center" }}>
                    <Fonticon type={"Ionicons"} name={"chevron-back"} size={wp(7)} color={Colors.Black}
                        onPress={() => props.navigation.goBack(null)} />
                </View>
                <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>

                    <View style={{ marginHorizontal: wp(4) }}>
                        <Text style={{ textAlign: "center", fontSize: 25 }}>Community</Text>
                    </View>
                </View>
                <View style={{ flex: .5, paddingRight: wp(3), alignItems: "flex-end" }}>
                </View>
            </View>
            <ChatTopBar />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1
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
    }
})
