import React, { useEffect, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { Colors } from '../../../Constants/Colors';
import { wp } from '../../../Helpers/Responsiveness';
import { connect } from 'react-redux';
import Loader from '../../../Components/Loader';
import Axios from '../../../Components/Axios';
import { SetSession } from '../../../Redux/Actions/Actions';
import moment from 'moment'

const P_Data = [

    {
        name: "Ali nawax",
        points: 3
    },
    {
        name: "Ali nawax",
        points: 6
    },
    {
        name: "Ali nawax",
        points: 3
    },

]

const Habits = ({ navigation, ...props }) => {

    const [POD, setPOD] = useState('');
    const [challangeTitle, setChallangeTitle] = useState('');
    const [habbitMapArray, sethabbitMapArray] = useState('');
    const [loading, setLoading] = useState(false)


    useFocusEffect(
        React.useCallback(() => {
            getTodayTasks()
        }, [])
    );

    const getTodayTasks = async () => {
        // setLoading(true) 
        let param = {};
        param["companyId"] = props.userData.company;
        param["startDate"] = props.ChallengestartDate;
        param["expiryDate "] = props.ChallengeEndDate;
        await Axios("dashboard/habits", param, 'POST').then(async (response) => {
            // alert("sdsdsdsds" + JSON.stringify(response.challange.habbits.length))
            if (response.error === undefined) {

                var perChunk = 3
                var result = {}
                result = response.usersArray.reduce((resultArray, item, index) => {
                    const chunkIndex = Math.floor(index / perChunk)
                    if (!resultArray[chunkIndex]) {
                        resultArray[chunkIndex] = []
                    }
                    resultArray[chunkIndex].push(item)
                    return resultArray
                }, [])
                sethabbitMapArray(result)
                setPOD(response.challange.habbits)
                setChallangeTitle(response.challange.challangeTitle)

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

    return (
        <View style={styles.container}>
            <View style={{ marginHorizontal: wp(5) }}>

                {/* <Text style={{ color: Colors.LightGray, marginTop: wp(5), alignSelf: "center" }}>
                    1 July 2021
             <Text style={{ color: Colors.Yellow }}> - 16 July -</Text>
               1 August 2021</Text> */}
                <Text style={{ color: Colors.Yellow, marginTop: wp(7), fontWeight: "bold" }}>{challangeTitle}</Text>
                <FlatList
                    data={POD}
                    extraData={POD}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: wp(20) }}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (
                        <View style={{ marginTop: wp(8) }}>
                            <Text style={{ fontSize: 16, color: "#E8C11E", marginBottom: 10 }}>{item.habbitTitle}{"  (Top 3)"}</Text>
                            {habbitMapArray[index].map((itemm, indexx) =>
                                <View style={{ flexDirection: "row", marginTop: 15 }}>
                                    <Text>{itemm.fullName}</Text>
                                    <View style={{ flex: 1, alignItems: "flex-end" }}>
                                        <Text style={{ color: Colors.Yellow }}>{itemm.score}</Text>
                                    </View>
                                </View>
                            )}
                        </View>
                    )} />
            </View>
            <Loader loading={loading} />

        </View>
    )
}

const mapStateToProps = (state) => {
    return {
        userId: state.AuthReducer.userId,
        userData: state.AuthReducer.userData,
        ChallengestartDate: state.HomeReducer.ChallengestartDate,

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        SessionMaintain: (data) => dispatch(SetSession(data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Habits);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.White
    },
})
