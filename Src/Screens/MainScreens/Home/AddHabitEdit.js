import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { Colors } from '../../../Constants/Colors';
import { wp } from '../../../Helpers/Responsiveness';
import Header from '../../../Components/Header';
import InputField from '../../../Components/InputField';
import Axios from '../../../Components/Axios';
import { connect } from 'react-redux';
import Loader from '../../../Components/Loader';
import NewAlert from '../../../Components/NewAlert';


const AddHabitEdit = (props) => {

    const [HabitName, setHabitName] = useState('');
    const [target, setTarget] = useState('');
    const [loading, setLoading] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    const [alertText, setalertText] = useState('')


    useEffect(() => {
        setValue()
    }, [])

    const setValue = () => {
        let habitData = props.route.params.addHabitData
        // alert(JSON.stringify(habitData._id))
        setHabitName(habitData.habbitTitle)
        setTarget(habitData.habbitDescription)
    }

    const AddHabitToday = async () => {
        // alert(JSON.stringify(props.ChallengeId))
        if (HabitName === '') {
            alert("Please Add Habit Name")
        } else if (target === '') {
            alert("Please set target")
        }
        else {
            setLoading(true)
            let param = {};
            param["user"] = props.userId;
            param["habbitTitle"] = HabitName;
            param["habbitDescription"] = target;
            param["department"] = props.userData.department;
            param["company"] = props.userData.company;
            param["challange"] = props.ChallengeId;
            param["startDate"] = props.ChallengestartDate;
            param["expiryDate"] = props.ChallengeEndDate;
            // alert(JSON.stringify(props.userId))
            await Axios("specialHabbit/edit/"+props.route.params.addHabitData._id, param, 'PUT').then(async (response) => {
                // alert(JSON.stringify(response))

                props.navigation.goBack()

                // if (response._id !== undefined) {
                //     setPOD(response.habbits)
                //     setChallangeTitle(response.challangeTitle)
                // }
               
                setLoading(false)
            })
                .catch((err) => {
                    alert(JSON.stringify(err))
                    console.warn(err)
                    setLoading(false)
                })


        }
    }
    return (
        <View style={styles.container}>
            <Header onPress={() => props.navigation.goBack(null)} title={"Edit Habit"} savePress={() => AddHabitToday()} />
            <View style={{ marginHorizontal: wp(5) }}>

                <InputField marginTop={wp(10)} borderText={"Habit Name"}
                    value={HabitName}
                    onChangeText={(HabitName) => setHabitName(HabitName)} />
                <Text style={{ fontSize: 15, color: Colors.Yellow, fontWeight: "bold", marginBottom: -3, marginTop: wp(5) }}>Set Target</Text>
                <InputField placeholder={"set your target"}
                    value={target}
                    onChangeText={(target) => setTarget(target)} 
                    maxLength = {84}/>
            </View>
            <Loader loading={loading} />
            <NewAlert show={showAlert}
                text={alertText}
                onPressOk={() => setShowAlert(false)} />
        </View>
    )
}

const mapStateToProps = (state) => {
    return {
        userId: state.AuthReducer.userId,
        userData: state.AuthReducer.userData,
        ChallengestartDate: state.HomeReducer.ChallengestartDate,
        ChallengeEndDate: state.HomeReducer.ChallengeEndDate,
        ChallengeId: state.HomeReducer.ChallengeId,

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        SessionMaintain: (data) => dispatch(SetSession(data))
    }
}
export default connect(mapStateToProps, null)(AddHabitEdit);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.White
    }
})
