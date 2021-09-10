import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { Colors } from '../../../Constants/Colors';
import { wp } from '../../../Helpers/Responsiveness';
import Loader from '../../../Components/Loader';
import Axios from '../../../Components/Axios';
import { connect } from 'react-redux';
import { SetSession } from '../../../Redux/Actions/Actions';
import moment from 'moment'


const POD = (props) => {
    const [POD, setPOD] = useState('');
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getTodayTasks()
    }, [])

    const getTodayTasks = async () => {
        setLoading(true)
        // alert(props.ChallengestartDate)
        let param = {};
        param["companyId"] = props.userData.company;
        param["departmentId"] = props.userData.department;
        param["startDate"] = props.ChallengestartDate;
        await Axios("dashboard/department", param, 'POST').then(async (response) => {
            // alert(JSON.stringify(response))
            if (response.error === undefined) {
                setPOD(response)
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

                <FlatList
                    data={POD}
                    extraData={POD}
                    onRefresh={() => getTodayTasks()}
                    refreshing={loading}
                    contentContainerStyle={{ paddingBottom: wp(20) }}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (
                        <View style={{ marginTop: wp(8), flexDirection: "row" }}>
                            <Text style={{width:wp(30)}}>{item.fullName}</Text>
                            <View style={{ backgroundColor: Colors.Yellow, height: 4, borderRadius: 30, marginLeft: 5, marginRight: 5, flex: item.score / 10, alignSelf: "center" }} />
                            <Text style={{ marginLeft: 10, color: Colors.Yellow }}>{item.score}</Text>
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
export default connect(mapStateToProps, mapDispatchToProps)(POD);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.White
    },
})
