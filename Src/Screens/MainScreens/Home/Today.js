import React from 'react'
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native'

import { Colors } from '../../../Constants/Colors';
import { iconPath } from '../../../Constants/icon';
import { wp } from '../../../Helpers/Responsiveness';
import Fonticon from '../../../Constants/FontIcon';

const DATA = [
    { id: "1", title: "d" },
    { id: "2", title: "s" },
    { id: "3", title: "d" },
    { id: "4", title: "w" },
    { id: "1", title: "4" },
    { id: "2", title: "7" },
    { id: "3", title: "e" },
    { id: "4", title: "v" },
]

const Today = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.headerStyle}>
                <View style={{ flex: .5, paddingLeft: wp(3) }}>
                    <Text>Day 1/42</Text>
                </View>
                <View style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                    <Fonticon type={"AntDesign"} name={"doubleleft"} size={wp(7)} color={Colors.Yellow}
                        onPress={() => props.navigation.navigate("Yesterday")}
                    />
                    <View style={{ marginHorizontal: wp(4) }}>
                        <Text style={{ textAlign: "center", fontSize: 25 }}>Today</Text>
                        <Text style={{ textAlign: "center", fontSize: 9 }}>12-7-2021</Text>
                    </View>
                    <Fonticon type={"AntDesign"} name={"doubleright"} size={wp(7)} color={Colors.Yellow}
                        onPress={() => props.navigation.navigate("Tomorrow")} />
                </View>
                <TouchableOpacity onPress={() => props.navigation.navigate('ProfileStack', { screen: 'Profile' })}
                    style={{ flex: .5, paddingRight: wp(3), alignItems: "flex-end" }}>
                    <Image source={iconPath.BLACKLOGO} style={styles.imageStyle} />
                </TouchableOpacity>
            </View>

            <View style={{ flexDirection: "row", marginHorizontal: wp(5), marginTop: wp(10) }}>
                <Text style={{ fontSize: 25, width: wp(80), fontWeight: "bold" }}>Get Fueled with the Energizing Habits</Text>
                <Fonticon type={"AntDesign"} name={"pluscircle"} size={wp(12)} color={Colors.Yellow} style={{ alignSelf: "center" }} />
            </View>
            <FlatList
                style={{ marginTop: wp(5), marginHorizontal: wp(5) }}
                data={DATA}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <TouchableOpacity style={{ backgroundColor: Colors.LightGray, marginTop: wp(2), paddingHorizontal: wp(5), height: wp(25), borderRadius: wp(5), justifyContent: "center" }}>
                        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Morning me time</Text>
                        <Text style={{ fontSize: 12, marginTop: 6, width: wp(50) }}>Wake up before your usual time to focus on yourself</Text>
                    </TouchableOpacity>
                )} />

        </View>
    )
}
export default Today;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.White,
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
