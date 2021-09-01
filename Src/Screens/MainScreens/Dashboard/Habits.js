import React, { useEffect, useState } from 'react'

import { View, Text, StyleSheet, FlatList } from 'react-native'
import { Colors } from '../../../Constants/Colors';
import { wp } from '../../../Helpers/Responsiveness';
import { connect } from 'react-redux';
import Loader from '../../../Components/Loader';
import Axios from '../../../Components/Axios';
import { SetSession } from '../../../Redux/Actions/Actions';

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

const Habits = (props) => {

    const [POD, setPOD] = useState('');
    const [challangeTitle, setChallangeTitle] = useState('');
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getTodayTasks()
    }, [])

    const getTodayTasks = async () => {
        setLoading(true)
        let param = {};
        param["companyId"] = props.userData.company;
        param["startDate"] = "2021-08-02";
        await Axios("dashboard/habits", param, 'POST').then(async (response) => {
            // alert(JSON.stringify(response.habbits))
            if (response.error === undefined) {
                setPOD(response.habbits)
                setChallangeTitle(response.challangeTitle)
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
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (
                        <View style={{ marginTop: wp(8), flexDirection:"row" }}>
                            <View>
                            <Text>{item.habbitTitle}</Text>
                            <Text>{item.habbitDescription}</Text>
                            </View>
                            <Text style={{marginLeft:10, color:Colors.Yellow}}>{item.score}</Text>
                        </View>
                    )} />
                {/* <Text style={{ color: Colors.Yellow, marginTop: wp(7), fontWeight: "bold" }}>Reading (Top 3)</Text>

                <FlatList
                    data={P_Data}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (
                        <View style={{ marginTop: wp(8), flexDirection:"row" }}>
                            <Text>{item.name}</Text>
                            <Text style={{marginLeft:10, color:Colors.Yellow}}>{item.points}</Text>
                        </View>
                    )} /> */}
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
