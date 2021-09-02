import React from 'react'
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native'

import { iconPath } from '../../../Constants/icon';
import { wp } from '../../../Helpers/Responsiveness';
import { Colors } from '../../../Constants/Colors';
import Fonticon from '../../../Constants/FontIcon';

const DATA = [
    { id: "1", ChallengeName: "Morning Workout", workOutQuantity: "20 min" },
    { id: "2", ChallengeName: "Meditation", workOutQuantity: "20 min" },
    { id: "3", ChallengeName: "Drink Water", workOutQuantity: "4-5L" },
    { id: "4", ChallengeName: "Reading", workOutQuantity: "20 Pages" },
]

export default function NewHome() {
    return (
        <View style={styles.container}>
            <View style={{ flex: .2, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <View>
                    <Text style={{ fontSize: 25, fontWeight:"bold" }}>Good Morning</Text>
                    <Text style={{ fontSize: 25, fontWeight:"bold" }}>James Vinci</Text>
                </View>
                <TouchableOpacity
                    style={{ paddingRight: wp(3), alignItems: "flex-end" }}>
                    <Image source={iconPath.BLACKLOGO} style={styles.imageStyle} />
                </TouchableOpacity>
            </View>
            <View style={{ flex: .12, fontSize: 15, paddingHorizontal: wp(5), marginTop:wp(-4) }}>
                <Text style={{ color: "#A2A9AC", alignSelf:"center" }}>August</Text>

                <View style={{ flexDirection: "row", marginTop: wp(5), justifyContent: "space-between" }}>
                    <View style={{alignItems:"center"}}>
                        <Text style={{fontSize:12, color:"#D1D1D1"}}>Mon</Text>
                        <Text style={{fontSize:12, color:"#D1D1D1", marginTop:5}}>12</Text>
                    </View>
                    <View style={{alignItems:"center"}}>
                        <Text style={{fontSize:12, color:"#D1D1D1"}}>Tue</Text>
                        <Text style={{fontSize:12, color:"#D1D1D1", marginTop:5}}>13</Text>
                    </View>
                    <View style={{alignItems:"center"}}>
                        <Text style={{fontSize:12, color:"#E8C11E"}}>Wed</Text>
                        <Text style={{fontSize:12, color:"#E8C11E", marginTop:5}}>14</Text>
                    </View>
                    <View style={{alignItems:"center"}}>
                        <Text style={{fontSize:12, color:"#D1D1D1"}}>Thu</Text>
                        <Text style={{fontSize:12, color:"#D1D1D1", marginTop:5}}>15</Text>
                    </View>
                    <View style={{alignItems:"center"}}>
                        <Text style={{fontSize:12, color:"#D1D1D1"}}>Fri</Text>
                        <Text style={{fontSize:12, color:"#D1D1D1", marginTop:5}}>16</Text>
                    </View>
                    <View style={{alignItems:"center"}}>
                        <Text style={{fontSize:12, color:"#D1D1D1"}}>Sat</Text>
                        <Text style={{fontSize:12, color:"#D1D1D1", marginTop:5}}>17</Text>
                    </View>
                    <View style={{alignItems:"center"}}>
                        <Text style={{fontSize:12, color:"#D1D1D1"}}>Sun</Text>
                        <Text style={{fontSize:12, color:"#D1D1D1", marginTop:5}}>12</Text>
                    </View>
                </View>


            </View>
            <View style={{ flex: .59 }}>
                <FlatList
                    data={DATA}
                    // extraData={DATA}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (
                        <View style={{ backgroundColor: "#A2A9AC", borderRadius: 12, paddingHorizontal: wp(5), marginTop: wp(3), paddingVertical: wp(5) }}>
                            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                <Text style={{ color: "#FFFFFF", fontSize: 17 }}>{item.ChallengeName}</Text>
                                <Text style={{ color: "#FFFFFF", fontSize: 13 }}>{item.workOutQuantity}</Text>
                            </View>
                            <View style={{ flexDirection: "row", marginTop: wp(4), justifyContent: "space-between" }}>
                                <Fonticon type={"MaterialCommunityIcons"} name={"circle"} size={18} color={Colors.Yellow} />
                                <Fonticon type={"MaterialCommunityIcons"} name={"circle"} size={18} color={Colors.Yellow} />
                                <Fonticon type={"MaterialCommunityIcons"} name={"circle-outline"} size={18} color={Colors.Yellow} />
                                <Fonticon type={"MaterialCommunityIcons"} name={"circle-outline"} size={18} color={Colors.Yellow} />
                                <Fonticon type={"MaterialCommunityIcons"} name={"circle-outline"} size={18} color={Colors.Yellow} />
                                <Fonticon type={"MaterialCommunityIcons"} name={"circle-outline"} size={18} color={Colors.Yellow} />
                                <Fonticon type={"MaterialCommunityIcons"} name={"circle-outline"} size={18} color={Colors.Yellow} />
                            </View>

                        </View>
                    )} />



            </View>
            <View style={{ flex: .09, justifyContent: "center", alignItems: "flex-end" }}>
                <Fonticon type={"AntDesign"} name={"pluscircle"} size={wp(15)} color={Colors.Yellow}
                    onPress={() => props.navigation.navigate("AddHabit")} />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: wp(5)
    },
    imageStyle: {
        width: wp(14),
        height: wp(14),
        borderRadius: wp(7)
    }
})