import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native'

import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import { Colors } from '../../../Constants/Colors';
import { iconPath } from '../../../Constants/icon';
import { wp } from '../../../Helpers/Responsiveness';
import Fonticon from '../../../Constants/FontIcon';
import Loader from '../../../Components/Loader';
import Axios from '../../../Components/Axios';
import { connect } from 'react-redux';
import { SetSession } from '../../../Redux/Actions/Actions';
import { fonts } from '../../../Constants/Fonts';

const DATA = [
    { id: "1", title: "Morning me time", desc: "wake up before your usual time to focus on your self" },
    { id: "2", title: "Meditation", desc: "Spend the first 10min with meditation" },
    { id: "3", title: "Journaling & Gradtitude", desc: "Express gratitide and increase your awareness" },
    { id: "4", title: "Move", desc: "Get the blood flowing with an invigorating 30min workout of your choice" },
    { id: "5", title: "Hydration", desc: "Drink at least 1/2 your body weight (lbs) in fl oz" },
]
const config = {
    velocityThreshold: 0.1,
    directionalOffsetThreshold: 100
};
const Today = (props) => {
    const [todayHabbit, setTodayHabbit] = useState('');
    const [loading, setLoading] = useState(false)
    const [hId, setHid] = useState('')

    useEffect(() => {
        getTodayTasks()
    }, [])

    const getTodayTasks = async () => {
        setLoading(true)
        let param = {};
        param["companyId"] = props.userData.company;
        param["userId"] = props.userId;
        await Axios("challange/todays", param, 'POST').then(async (response) => {
            // alert(JSON.stringify(response.habbits))
            if (response.error === undefined) {
                setTodayHabbit(response.habbits)
            } else {
                alert(JSON.stringify(response.error))
            }
            setLoading(false)
        })
            .catch((err) => {
                console.warn(err)
                setLoading(false)
            })
    }
    const completeHabbit = async (habbitId) => {
        setLoading(true)
    //    alert(habbitId)
    //    await setHid(habbitId)
        let param = {};
        param["user"] = props.userId;
        param["habbit"] = habbitId;
        param["department"] = props.userData.department;
        param["company"] = props.userData.company;
        // alert(JSON.stringify(param))
        await Axios("challange/completeHabbit", param, 'POST').then(async (response) => {
            setLoading(false)
        })
            .catch(async(err) => {
                if (err.toString().includes("Done")) {
                   await getTodayTasks()
                } else {
                    console.warn("jjj" + err)
                }
                setLoading(false)
            })
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerStyle}>
                <View style={{ flex: .5, paddingLeft: wp(3) }}>
                    <Text>Day 1/42</Text>
                </View>

                <View style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                    <Fonticon type={"AntDesign"} name={"doubleleft"} size={wp(7)} color={Colors.Yellow}
                    // onPress={() => props.navigation.navigate("Yesterday")}
                    />
                    <View style={{ marginHorizontal: wp(4) }}>
                        <Text style={{ textAlign: "center", fontSize: 25 }}>Today</Text>
                        <Text style={{ textAlign: "center", fontSize: 9 }}>12-7-2021</Text>
                    </View>
                    <Fonticon type={"AntDesign"} name={"doubleright"} size={wp(7)} color={Colors.Yellow}
                    // onPress={() => props.navigation.navigate("Tomorrow")} 
                    />
                </View>

                <TouchableOpacity onPress={() => props.navigation.navigate('ProfileStack', { screen: 'Profile' })}
                    style={{ flex: .5, paddingRight: wp(3), alignItems: "flex-end" }}>
                    <Image source={iconPath.BLACKLOGO} style={styles.imageStyle} />
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: "row", marginHorizontal: wp(5), marginTop: wp(10) }}>
                <Text style={{ fontSize: 25, width: wp(78) }}>Get Fueled with the Energizing Habits</Text>
                <Fonticon type={"AntDesign"} name={"pluscircle"} size={wp(12)} color={Colors.Yellow} style={{ alignSelf: "center" }}
                    onPress={() => props.navigation.navigate("AddHabit")} />
            </View>
            <FlatList
                style={{ marginTop: wp(5), marginHorizontal: wp(5) }}
                data={todayHabbit}
                extraData={todayHabbit}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                    // <TouchableOpacity onPress={() => select(item.id)}
                    <TouchableOpacity onPress={() => completeHabbit(item._id)}
                        style={{ backgroundColor: item.state !== "notDone" ? Colors.Yellow : Colors.Gray, marginTop: wp(2), paddingHorizontal: wp(5), height: wp(25), borderRadius: wp(5), justifyContent: "center" }}>
                        <Text style={{ fontSize: 20, fontWeight: "bold", color: item.state !== "notDone" ? Colors.White : Colors.Black }}>{item.habbitTitle}</Text>
                        <Text style={{ fontSize: 12, textAlign: "justify", marginTop: 6, width: wp(60), color: item.state !== "notDone" ? Colors.White : Colors.Black }}>{item.habbitDescription}</Text>
                    </TouchableOpacity>
                )} />
            <Loader loading={loading} />

        </View>
    )
}
const mapStateToProps = (state) => {
    return {
        userId: state.AuthReducer.userId,
        userData: state.AuthReducer.userData,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        SessionMaintain: (data) => dispatch(SetSession(data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Today);
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
        marginTop: wp(-6)
    },
    imageStyle: {
        width: wp(10),
        height: wp(10),
        borderRadius: wp(10) / 2
    }
})
