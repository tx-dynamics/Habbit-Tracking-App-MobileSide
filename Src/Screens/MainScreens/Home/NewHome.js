import React, { useState, useEffect } from 'react'
import {
    View, Text, StyleSheet, Image, FlatList, TouchableOpacity, ScrollView,
    Vibration,
    Pressable
} from 'react-native'

import { iconPath } from '../../../Constants/icon';
import { wp } from '../../../Helpers/Responsiveness';
import { Colors } from '../../../Constants/Colors';
import Fonticon from '../../../Constants/FontIcon';
import Loader from '../../../Components/Loader';
import Axios from '../../../Components/Axios';
import { connect } from 'react-redux';
import moment from 'moment';
import { startDateStore } from '../../../Redux/Actions/Actions'
import { useFocusEffect } from '@react-navigation/native';
import { TextInput } from 'react-native-gesture-handler';


const NewHome = (props) => {
    const [loading, setLoading] = useState(false)
    const [dateRange, setDateRange] = useState([])
    const [onlydateRange, setOnlydateRange] = useState([])
    const [currentMonth, setCurrentMonth] = useState('')
    const [weekStart, setWeekStart] = useState('')
    const [weekEnd, setWeekEnd] = useState('')
    const [challengeEndDatee, setChallengeEndDatee] = useState('')
    const [challengeStartDatee, setChallengeStartDatee] = useState('')
    const [habbitArray, setHabbitArray] = useState('')
    const [upcomingChallangeDate, setUpcomingChallangeDate] = useState('')
    const [upcomingChallangeAvailable, setUpcomingChallangeAvailable] = useState('')
    const [challengeFound, setChallengeFound] = useState(true)
    const [personName, setpersonName] = useState('')
    const [dateIndex, setDateIndex] = useState('')
    const [wholeDateArray, setWholeDateArray] = useState([])
    const [ChallangeAvailable, setChallangeAvailable] = useState(true)

    const [Imagebase64, setImagebase64] = useState("")
    const [pictureSelected, setpictureSelected] = useState(false)

    useEffect(() => {
        setLoading(true)
        // getPreviousTasks(moment(new Date()).format('YYYY-MM-DD'))
    }, [])
    useEffect(() => {
        setValues()
        // getPreviousTasks(moment(new Date()).format('YYYY-MM-DD'))
    }, [props.userData.profileImage])

    useFocusEffect(
        React.useCallback(() => {
            getTodayTasks(moment(new Date()).format('YYYY-MM-DD'))
            // getTodayTasks(moment(new Date()).format('2021-08-22'))
        }, [])
    );

    const setValues = () => {
        if (props.userData.profileImage === undefined) {
        }
        else {
            setImagebase64(props.userData.profileImage)
            setpictureSelected(true)
        }
        if (props.userData.fullName === undefined) {
        }
        else {
            setpersonName(props.userData.fullName)
        }
    }
    const getArray = async () => {
        var startDate = new Date("2021-08-13"); //YYYY-MM-DD
        var endDate = new Date("2021-09-06"); //YYYY-MM-DD
        var dateArrr = getDates(startDate, endDate);
        var dateArrayy = splitArr(dateArrr, 7);
        setWholeDateArray(dateArrayy)
        var datefind = isInArray(dateArrayy[0], "2021-09-03");
        for (let index = 0; index < dateArrayy.length; index++) {
            var datefind = isInArray(dateArrayy[index], "2021-08-28");
            if (datefind) {
                setDateIndex(index)
                await setDateRange(dateArrayy[index])
            }
        }
        // var pos = dateArrayy[3].indexOf("2021-09-06");
        // alert(pos)
        // alert(dateArrayy[3][3].Date === "2021-09-06")
        // alert(JSON.stringify(dateArrayy.length))
        // await setDateRange(dateArrayy[2])
        // await setDateRange(dateArrr)
    }
    const ScrollDateLeft = () => {
        var prevDate = moment(weekStart).subtract(1, "days").format("YYYY-MM-DD");
        // alert(prevDate)
        if (challengeStartDatee > prevDate) {
            // alert(challengeStartDatee + "if" + prevDate)
        } else {
            setLoading(true)
            getTodayTasks(prevDate)
        }
    }
    const ScrollDateRight = () => {
        var nextDate = moment(weekEnd).add(1, "days").format("YYYY-MM-DD");
        if (challengeEndDatee < nextDate) {
            // alert(challengeEndDatee + "if" + nextDate)
        } else {
            setLoading(true)
            getTodayTasks(nextDate)
        }

    }
    function isInArray(array, value) {
        return !!array.find(item => { return item.Date == value });
    }
    const getTodayTasks = async (date) => {
        // setLoading(true)
        let param = {};
        param["date"] = date;
        param["companyId"] = props.userData.company;
        param["userId"] = props.userId;
        await Axios("challange/date", param, 'POST').then(async (response) => {
            // alert(JSON.stringify(response))
            // console.log("ndvmdmmdn" + JSON.stringify(response))
            if (response.msg === undefined) {
                getDateDetails(response)
                setHabbitArray(response.habbits)
                setChallengeFound(true)
                setChallangeAvailable(true)
                setChallengeEndDatee(response.expiryDate.split('T')[0])
                setChallengeStartDatee(response.startDate.split('T')[0])
                // alert(response.startDate.split('T')[0] + response.expiryDate.split('T')[0])
                // alert(JSON.stringify(response._id))
                let data = {}
                data["ChallengestartDate"] = response.startDate.split('T')[0];
                data["ChallengeEndDate"] = response.expiryDate.split('T')[0];
                data["ChallengeId"] = response._id;
                // alert(JSON.stringify(data))
                props.storeStartDate(data)
            } else {
                getPreviousTasks(moment(new Date()).format('YYYY-MM-DD'))
            }
            setLoading(false)
        })
            .catch((err) => {
                console.warn(err)
                setLoading(false)
            })
    }
    const getPreviousTasks = async (date) => {
        // alert(date)
        let param = {};
        param["date"] = date;
        param["companyId"] = props.userData.company;
        // param["companyId"] = "614368d2268fe600229d86bd";
        param["userId"] = props.userId;
        await Axios("challange/previousChallange", param, 'POST').then(async (response) => {
            // alert(JSON.stringify(response))
            // console.log("ndvmdmmdn" + JSON.stringify(response.habbits[0]))
            if (response.prevData) {
                // alert("idfff")
                getDateDetails(response)
                setHabbitArray(response.habbits)
                setChallengeFound(true)
                setChallangeAvailable(false)
                setUpcomingChallangeDate(response.upComingChallDate)
                setUpcomingChallangeAvailable(true)
                setChallengeEndDatee(response.expiryDate.split('T')[0])
                setChallengeStartDatee(response.startDate.split('T')[0])
                // alert(JSON.stringify(response._id))
                let data = {}
                data["ChallengestartDate"] = response.startDate.split('T')[0];
                data["ChallengeEndDate"] = response.expiryDate.split('T')[0];
                data["ChallengeId"] = response._id;
                // alert(JSON.stringify(data))
                props.storeStartDate(data)
            } else {
                // alert("no Challange")
                setChallengeFound(false)
                if (!response.upComingChallDate) {
                    setUpcomingChallangeAvailable(false)
                } else {
                    setUpcomingChallangeAvailable(true)
                    setUpcomingChallangeDate(response.upComingChallDate)
                }
            }
            setLoading(false)
        })
            .catch((err) => {
                console.warn(err)
                setLoading(false)
            })
    }
    const getDateDetails = (response) => {
        setWeekStart(response.weekStart)
        setWeekEnd(response.weekEnd)
        var dateArrr = getDates(response.weekStart, response.weekEnd);
        // alert(JSON.stringify(dateArrr[0]))
        setOnlydateRange(dateArrr[1])
        setDateRange(dateArrr[0])
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var d = new Date(response.weekEnd);
        var monthName = monthNames[d.getMonth()];
        setCurrentMonth(monthName)


    }
    function getDates(startDate, stopDate) {
        var dateArray = [];
        var onlydateArray = [];
        var currentDate = moment(startDate);
        var stopDate = moment(stopDate);
        while (currentDate <= stopDate) {
            var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            var d = new Date(currentDate);
            var dayName = days[d.getDay()];
            var DateObject = {
                "Date": moment(currentDate).format('YYYY-MM-DD'),
                "DateDay": moment(currentDate).format('DD'),
                "DayName": dayName
            }
            onlydateArray.push(moment(currentDate).format('YYYY-MM-DD'))
            dateArray.push(DateObject)
            // dateArray.push( moment(currentDate).format('YYYY-MM-DD') )
            currentDate = moment(currentDate).add(1, 'days');
        }
        return [dateArray, onlydateArray];
    }
    function splitArr(array, n) {
        let [...arr] = array;
        var res = [];
        while (arr.length) {
            res.push(arr.splice(0, n));
        }
        return res;
    }
    const EditPost = async (habbitId, item) => {
        // alert(JSON.stringify(item))
        if (item.special === undefined) {
        } else {
            props.navigation.navigate("AddHabitEdit", { addHabitData: item })
        }
        // alert(JSON.stringify(item.special))
    }
    const CompleteHabbit = async (habbitId, index, item) => {
        if (challengeStartDatee > onlydateRange[index]) {
        } else {
            if (challengeEndDatee < onlydateRange[index]) {
            } else {
                if (onlydateRange[index] <= moment(new Date()).format('YYYY-MM-DD')) {
                    // alert("equal")
                    Vibration.vibrate()
                    setLoading(true)
                    let param = {};
                    param["user"] = props.userId;
                    param["habbit"] = habbitId;
                    param["department"] = props.userData.department;
                    param["company"] = props.userData.company;
                    if (item.special === undefined) {
                        param["special"] = "false";
                    } else {
                        param["special"] = "true";
                    }
                    // alert(JSON.stringify(param))
                    await Axios("challange/completeHabbit", param, 'POST').then(async (response) => {
                        setLoading(false)
                    })
                        .catch(async (err) => {
                            if (err.toString().includes("Done")) {
                                await getTodayTasks(moment(new Date()).format('YYYY-MM-DD'))
                            } else {
                                console.warn(err)
                            }
                            setLoading(false)
                        })

                } else {
                    // alert("not Equal")
                }
            }
        }
    }

    return (
        <View style={styles.container}>
            <View style={{ flex: .2, justifyContent: "center" }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: wp(5) }}>
                    <View>
                        <Text style={{ fontSize: 25, fontWeight: "bold" }}>Get Energized </Text>
                        <Text style={{ fontSize: 25, fontWeight: "bold" }}>{personName}</Text>
                    </View>
                    <TouchableOpacity onPress={() => props.navigation.navigate('ProfileStack', { screen: 'Profile' })}
                        style={{ paddingRight: wp(3), alignItems: "flex-end" }}>
                        {/* <Image source={iconPath.BLACKLOGO} style={styles.imageStyle} /> */}
                        <Image source={pictureSelected ? { uri: `data:image/jpeg;base64,${Imagebase64}` } : iconPath.BLACKLOGO} style={styles.imageStyle} />
                    </TouchableOpacity>
                </View>

                {upcomingChallangeAvailable ?
                    <Text style={{ alignSelf: "center", color: Colors.Yellow }}>{"New Challange will be start on " + upcomingChallangeDate}</Text>
                    : null}
            </View>

            {challengeFound ?
                <>
                    <View style={{ flex: .12, fontSize: 15, marginTop: wp(-4) }}>
                        <Text style={{ color: "#A2A9AC", alignSelf: "center" }}>{currentMonth}</Text>
                        <ScrollView horizontal style={{}} contentContainerStyle={{ flex: 1, justifyContent: "space-between" }}>
                            <Fonticon type={"MaterialCommunityIcons"} name={"chevron-left"} size={28} color={Colors.Yellow} style={{ alignSelf: "center" }}
                                onPress={() => ScrollDateLeft()} />
                            {dateRange.map((item) =>
                                <View style={{ flexDirection: "row", marginTop: wp(5), }}>
                                    <View style={{ alignItems: "center" }}>
                                        <Text style={{ fontSize: moment(new Date()).format('YYYY-MM-DD') ? 14 : 12, color: item.Date === moment(new Date()).format('YYYY-MM-DD') ? Colors.Yellow : "#D1D1D1" }}>{item.DateDay}</Text>
                                        <Text style={{ fontSize: moment(new Date()).format('YYYY-MM-DD') ? 14 : 12, color: item.Date === moment(new Date()).format('YYYY-MM-DD') ? Colors.Yellow : "#D1D1D1", marginTop: 5 }}>{item.DayName}</Text>
                                    </View>
                                </View>
                            )}
                            <Fonticon type={"MaterialCommunityIcons"} name={"chevron-right"} size={28} color={Colors.Yellow} style={{ alignSelf: "center" }}
                                onPress={() => ScrollDateRight()} />

                        </ScrollView>

                    </View>
                    <View style={{ flex: .59, paddingHorizontal: wp(5), }}>
                        <FlatList
                            data={habbitArray}
                            // extraData={DATA}
                            contentContainerStyle={{ paddingBottom: wp(5) }}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item, index }) => (
                                <Pressable onLongPress={() => EditPost(item._id, item)}
                                    style={{ backgroundColor: "#D3D3D3", borderRadius: 12, paddingHorizontal: wp(5), marginTop: wp(3), paddingVertical: wp(5) }}>
                                    <View style={{}}>
                                        <Text style={{ color: "#FFFFFF", fontSize: 17 }}>{item.habbitTitle}</Text>
                                        {/* <Text style={{ color: "#FFFFFF", fontSize: 13 }} numberOfLines={2}>{" uhuhuh jhjhjh jkjj ijjij ihihh hhhjhhj jhhjhhj hjhjhjh jhjjhjh ihihihihuu gughhg ugughuhhu sdsds sajhhcdsa adhiahids aduhaihdiha adihahjsdha aishdiasidh "}</Text> */}
                                        <Text style={{ color: "#FFFFFF", fontSize: 13 }} numberOfLines={2}>{item.habbitDescription}</Text>
                                    </View>
                                    <ScrollView horizontal style={{}} contentContainerStyle={{ flex: 1, justifyContent: "space-between" }}>
                                        {item.dates.map((itemm, indexx) =>
                                            <View style={{ flexDirection: "row", marginTop: wp(4), justifyContent: "space-between", paddingHorizontal: wp(3) }}>
                                                <Fonticon type={"MaterialCommunityIcons"} name={itemm.weekDay === "notDone" ? "circle-outline" : "circle"} size={itemm.weekDay === "notDone" ? 18 : 27} color={Colors.Yellow}
                                                    onPress={() => CompleteHabbit(item._id, indexx, item)}
                                                    style={{ marginTop: itemm.weekDay === "notDone" ? 0 : -5 }} />
                                                {/* <Text>{onlydateRange[0]}</Text> */}
                                            </View>
                                        )}
                                    </ScrollView>
                                </Pressable>
                            )} />
                    </View>

                </>
                :
                <View style={{ flex: .73, alignItems: "center", }}>
                    <Text style={{ marginTop: wp(10), fontSize: 20 }}>{"No challange found"}</Text>
                </View>

            }
            {challengeFound &&
                <View style={{ flex: .09, justifyContent: "center", alignItems: "flex-end", marginRight: 5 }}>
                    <Fonticon type={"AntDesign"} name={"pluscircle"} size={wp(15)} color={Colors.Yellow}
                        onPress={() => props.navigation.navigate("AddHabit")} />
                </View>
            }
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
        storeStartDate: (data) => dispatch(startDateStore(data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(NewHome);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    imageStyle: {
        width: wp(14),
        height: wp(14),
        resizeMode: "cover",
        borderRadius: wp(7)
    }
})