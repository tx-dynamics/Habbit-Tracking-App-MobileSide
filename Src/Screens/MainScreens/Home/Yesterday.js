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
    const [tomorrowHabbit, setTomorrowHabbit] = useState('');
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        getTodayTasks()
    }, [])

    const getTodayTasks = async () => {
        setLoading(true)
        let param = {};
        param["companyId"] = props.userData.company;
        param["userId"] = props.userId;
        await Axios("challange/yesterday", param, 'POST').then(async (response) => {
            if (response.error === undefined) {
                // alert(JSON.stringify(response.habbits))
                setTomorrowHabbit(response.habbits)
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
        let param = {};
        param["user"] = props.userId;
        param["habbit"] = habbitId;
        param["department"] = props.userData.department;
        param["company"] = props.userData.company;
        await Axios("challange/completeHabbit", param, 'POST').then(async (response) => {
            setLoading(false)
        })
            .catch(async (err) => {
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
                <Text style={{ fontWeight: "bold", color: Colors.LightGray }}>Your Yesterday habit</Text>
            </View>
            <FlatList
                style={{ marginTop: wp(5), marginHorizontal: wp(5) }}
                data={tomorrowHabbit}
                extraData={tomorrowHabbit}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                    // <TouchableOpacity onPress={() => select(item.id)}
                    <TouchableOpacity
                        activeOpacity={0.9}
                        // onPress={() => completeHabbit(item._id)}
                        style={{ backgroundColor: item.state === "done" ? Colors.Yellow : Colors.Gray, marginTop: wp(2), paddingHorizontal: wp(5), height: wp(25), borderRadius: wp(5), justifyContent: "center" }}>
                        <Text style={{ fontSize: 20, fontWeight: "bold", color: item.state === "done" ? Colors.White : Colors.Black }}>{item.habbitTitle}</Text>
                        <Text style={{ fontSize: 12, textAlign: "justify", marginTop: 6, width: wp(60), color: item.state === "done" ? Colors.White : Colors.Black }}>{item.habbitDescription}</Text>
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
export default connect(mapStateToProps, mapDispatchToProps)(Yesterday);
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
