import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { Colors } from '../../../Constants/Colors';
import { wp } from '../../../Helpers/Responsiveness';
import Loader from '../../../Components/Loader';
import Axios from '../../../Components/Axios';
import { connect } from 'react-redux';
import { SetSession } from '../../../Redux/Actions/Actions';

const Individual = (props) => {
    const [individual, setIndividual] = useState('');
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getTodayTasks()
    }, [])

    const getTodayTasks = async () => {
        setLoading(true)
        let param = {};
        param["companyId"] = props.userData.company;
        param["startDate"] = "2021-08-02";
        await Axios("dashboard/individual", param, 'POST').then(async (response) => {
            if (response.error === undefined) {
                setIndividual(response)
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

                <Text style={{ color: Colors.Yellow, marginTop: wp(7), fontWeight: "bold" }}>Top 50</Text>
                <FlatList
                    data={individual}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (
                        <View style={{ marginTop: wp(8), flexDirection: "row" }}>
                            <Text style={{ width: wp(20) }}>{item.fullName}</Text>
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
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        SessionMaintain: (data) => dispatch(SetSession(data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Individual);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.White
    },
})
