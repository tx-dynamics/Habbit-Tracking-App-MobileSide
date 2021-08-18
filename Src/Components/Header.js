import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

import { Colors } from '../Constants/Colors';
import { wp } from '../Helpers/Responsiveness';
import Fonticon from '../Constants/FontIcon';

export default function Header(props) {
    return (
        <View style={styles.container}>
            <View style={styles.headerStyle}>
                <View style={{ flex: .1, paddingLeft: wp(3), flexDirection: "row", alignItems: "center" }}>
                    <Fonticon type={"Ionicons"} name={"chevron-back"} size={wp(7)} color={Colors.Black}
                        onPress={props.onPress} />
                </View>
                <View style={{ flex: 1, alignItems: "center", justifyContent: "center", }}>
                    <View style={{ marginHorizontal: wp(4), alignSelf: "center" }}>
                        <Text style={{ textAlign: "center", fontSize: 25, marginLeft: wp(-8) }}>{props.title}</Text>
                    </View>
                </View>
                {props.savePress &&
                    <TouchableOpacity onPress={props.savePress}
                        style={{ marginRight: wp(3), marginLeft: wp(-7) }}>
                        <Text style={{ color: Colors.Yellow, fontSize: 16 }}>Save</Text>
                    </TouchableOpacity>
                }
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
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
