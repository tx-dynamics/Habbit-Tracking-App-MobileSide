import React from 'react'
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native'

import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import { Colors } from '../../../Constants/Colors';
import { iconPath } from '../../../Constants/icon';
import { wp } from '../../../Helpers/Responsiveness';
import Fonticon from '../../../Constants/FontIcon';

const DATA = [
    { id: "1", title: "Deposit" },
    { id: "2", title: "Withdraw" },
    { id: "3", title: "Buy" },
    { id: "4", title: "Stake" },
    { id: "1", title: "Deposit" },
]
const config = {
    velocityThreshold: 0.1,
    directionalOffsetThreshold: 1009
};
const Yesterday = (props) => {

    const onSwipeLeft=(gestureState)=> {
        props.navigation.goBack(null)
    }
    return (
        <View style={styles.container}>
            <View style={styles.headerStyle}>
                <View style={{ flex: .5, paddingLeft: wp(3), flexDirection: "row", alignItems: "center" }}>
                    <Fonticon type={"Ionicons"} name={"chevron-back"} size={wp(7)} color={Colors.Black}
                        onPress={() => props.navigation.goBack(null)} />
                    <Text>Day 1/42</Text>
                </View>
                <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>

                    <View style={{ marginHorizontal: wp(4) }}>
                        <Text style={{ textAlign: "center", fontSize: 25 }}>Yesterday</Text>
                        <Text style={{ textAlign: "center", fontSize: 9 }}>11-7-2021</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={() => props.navigation.navigate('ProfileStack', { screen: 'Profile' })}
                    style={{ flex: .5, paddingRight: wp(3), alignItems: "flex-end" }}>
                    <Image source={iconPath.BLACKLOGO} style={styles.imageStyle} />
                </TouchableOpacity>
            </View>

            <View style={{ flexDirection: "row", marginHorizontal: wp(5), marginTop: wp(10) }}>
                <Text style={{ fontWeight: "bold", color:Colors.LightGray }}>Your Yesterday habit</Text>
            </View>
            <FlatList
                style={{ marginTop: wp(5), marginHorizontal: wp(5) }}
                data={DATA}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <TouchableOpacity style={{ backgroundColor: Colors.Yellow, marginTop: wp(2), paddingHorizontal: wp(5), height: wp(25), borderRadius: wp(5), justifyContent: "center" }}>
                        <Text style={{ fontSize: 20, fontWeight: "bold", color: Colors.White }}>Morning me time</Text>
                        <Text style={{ fontSize: 12, marginTop: 6, width: wp(50),  color: Colors.White }}>Wake up before your usual time to focus on yourself</Text>
                    </TouchableOpacity>
                )} />

        </View>
    )
}
export default Yesterday;
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
        marginTop:wp(-6)

    },
    imageStyle: {
        width: wp(10),
        height: wp(10),
        borderRadius: wp(10) / 2
    }
})
