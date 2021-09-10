import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, ScrollView } from 'react-native'

import { iconPath } from '../../../Constants/icon';
import { wp } from '../../../Helpers/Responsiveness';
import { Colors } from '../../../Constants/Colors';
import Fonticon from '../../../Constants/FontIcon';
import Loader from '../../../Components/Loader';
import Axios from '../../../Components/Axios';
import { connect } from 'react-redux';
import moment from 'moment';
import { startDateStore } from '../../../Redux/Actions/Actions'

const DATA = [
    { id: "1", ChallengeName: "Morning Workout", workOutQuantity: "20 min" },
    { id: "2", ChallengeName: "Meditation", workOutQuantity: "20 min" },
    { id: "3", ChallengeName: "Drink Water", workOutQuantity: "4-5L" },
    { id: "4", ChallengeName: "Reading", workOutQuantity: "20 Pages" },
]

const NewHome = (props) => {
    const [loading, setLoading] = useState(false)
    const [dateRange, setDateRange] = useState([])
    const [onlydateRange, setOnlydateRange] = useState([])
    const [currentMonth, setCurrentMonth] = useState('')
    const [weekStart, setWeekStart] = useState('')
    const [weekEnd, setWeekEnd] = useState('')
    const [habbitArray, setHabbitArray] = useState('')
    const [challengeFound, setChallengeFound] = useState(false)
    const [dateIndex, setDateIndex] = useState('')
    const [wholeDateArray, setWholeDateArray] = useState([])

    const [Imagebase64, setImagebase64] = useState("")
    const [pictureSelected, setpictureSelected] = useState(false)

    useEffect(() => {
        getTodayTasks(moment(new Date()).format('YYYY-MM-DD'))
        // getArray()
        setValues()
    }, [])

    const setValues = () => {
        // alert(JSON.stringify(props.userData.gender))
        if (props.userData.profileImage === undefined) {
        }
        else {
            setImagebase64(props.userData.profileImage)
            setpictureSelected(true)
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
        var startdate = moment(weekStart).subtract(1, "days").format("YYYY-MM-DD");
        getTodayTasks(startdate)
    }
    const ScrollDateRight = () => {
        var startdate = moment(weekEnd).add(1, "days").format("YYYY-MM-DD");
        getTodayTasks(startdate)
    }
    function isInArray(array, value) {
        return !!array.find(item => { return item.Date == value });
    }
    const getTodayTasks = async (date) => {
        setLoading(true)
        let param = {};
        param["date"] = date;
        param["companyId"] = props.userData.company;
        param["userId"] = props.userId;
        await Axios("challange/date", param, 'POST').then(async (response) => {
            // alert(date+JSON.stringify(response))
            // console.log("aaaasassaassa " + JSON.stringify(response.startDate.split('T')[0]))
            if (response.msg === undefined) {
                getDateDetails(response)
                setHabbitArray(response.habbits)
                setChallengeFound(true)
                // response.startDate.split('T')[0]
                props.storeStartDate({"ChallengestartDate" : response.startDate.split('T')[0] })
            } else {
                // setChallengeFound(false)
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

    const CompleteHabbit = async (habbitId, index) => {
        //    alert(habbitId)
        //    await setHid(habbitId)

        if (onlydateRange[index] === moment(new Date()).format('YYYY-MM-DD')) {
            // alert("equal")
            setLoading(true)
            let param = {};
            param["user"] = props.userId;
            param["habbit"] = habbitId;
            param["department"] = props.userData.department;
            param["company"] = props.userData.company;
            // alert(JSON.stringify(param))
            await Axios("challange/completeHabbit", param, 'POST').then(async (response) => {
                setLoading(false)
            })
                .catch(async (err) => {
                    if (err.toString().includes("Done")) {
                        await getTodayTasks(moment(new Date()).format('YYYY-MM-DD'))
                    } else {
                        console.warn("jjj" + err)
                    }
                    setLoading(false)
                })

        } else {
            // alert("not Equal")
        }
    }

    const CompleteHabbithhh = (index) => {
        // alert(index)
        if (onlydateRange[index] === moment(new Date()).format('YYYY-MM-DD')) {
            alert("equal")
        } else {
            alert("not Equal")
        }
        // alert(JSON.stringify(onlydateRange[index]))
    }


    return (
        <View style={styles.container}>
            <View style={{ flex: .2, flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: wp(5) }}>
                <View>
                    <Text style={{ fontSize: 25, fontWeight: "bold" }}>Good Morning</Text>
                    <Text style={{ fontSize: 25, fontWeight: "bold" }}>James Vinci</Text>
                </View>
                <TouchableOpacity onPress={() => props.navigation.navigate('ProfileStack', { screen: 'Profile' })}
                    style={{ paddingRight: wp(3), alignItems: "flex-end" }}>
                    {/* <Image source={iconPath.BLACKLOGO} style={styles.imageStyle} /> */}
                    <Image source={pictureSelected ? { uri: `data:image/jpeg;base64,${Imagebase64}` } : iconPath.BLACKLOGO} style={styles.imageStyle} />

                </TouchableOpacity>
            </View>
            {/* {challengeFound ?
                <> */}
            <View style={{ flex: .12, fontSize: 15, marginTop: wp(-4) }}>
                <Text style={{ color: "#A2A9AC", alignSelf: "center" }}>{currentMonth}</Text>
                <ScrollView horizontal style={{}} contentContainerStyle={{ flex: 1, justifyContent: "space-between" }}>
                    <Fonticon type={"MaterialCommunityIcons"} name={"chevron-left"} size={28} color={Colors.Yellow} style={{ alignSelf: "center" }}
                        onPress={() => ScrollDateLeft()} />
                    {dateRange.map((item) =>
                        <View style={{ flexDirection: "row", marginTop: wp(5), }}>
                            <View style={{ alignItems: "center" }}>
                                <Text style={{ fontSize: 12, color: item.Date === moment(new Date()).format('YYYY-MM-DD') ? Colors.Yellow : "#D1D1D1" }}>{item.DateDay}</Text>
                                <Text style={{ fontSize: 12, color: item.Date === moment(new Date()).format('YYYY-MM-DD') ? Colors.Yellow : "#D1D1D1", marginTop: 5 }}>{item.DayName}</Text>
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
                        <View style={{ backgroundColor: "#A2A9AC", borderRadius: 12, paddingHorizontal: wp(5), marginTop: wp(3), paddingVertical: wp(5) }}>
                            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                <Text style={{ color: "#FFFFFF", fontSize: 17 }}>{item.habbitTitle}</Text>
                                <Text style={{ color: "#FFFFFF", fontSize: 13 }}>{"20 min"}</Text>
                            </View>
                            <ScrollView horizontal style={{}} contentContainerStyle={{ flex: 1, justifyContent: "space-between" }}>
                                {item.dates.map((itemm, indexx) =>
                                    <View style={{ flexDirection: "row", marginTop: wp(4), justifyContent: "space-between", paddingHorizontal: wp(3) }}>
                                        <Fonticon type={"MaterialCommunityIcons"} name={itemm.weekDay === "notDone" ? "circle-outline" : "circle"} size={18} color={Colors.Yellow}
                                            onPress={() => CompleteHabbit(item._id, indexx)} />
                                        {/* <Text>{onlydateRange[0]}</Text> */}
                                    </View>
                                )}
                            </ScrollView>

                        </View>
                    )} />



            </View>

            {/* </>
                :
                <View style={{ flex: .73, alignItems:"center", }}>
                    <Text style={{marginTop:wp(10), fontSize:20}}>{"No challange found"}</Text>
                </View>

            } */}
            <View style={{ flex: .09, justifyContent: "center", alignItems: "flex-end", marginRight: 5 }}>
                <Fonticon type={"AntDesign"} name={"pluscircle"} size={wp(15)} color={Colors.Yellow}
                    onPress={() => props.navigation.navigate("AddHabit")} />
            </View>
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