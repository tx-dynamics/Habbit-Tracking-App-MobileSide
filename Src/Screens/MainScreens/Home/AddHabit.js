import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { Colors } from '../../../Constants/Colors';
import { wp } from '../../../Helpers/Responsiveness';
import Header from '../../../Components/Header';
import InputField from '../../../Components/InputField';

const AddHabit = (props) => {

    const [HabitName, setHabitName] = useState('');
    const [target, setTarget] = useState('');

    const AddHabitToday = () => {
        if (HabitName === '') {
            alert("Please Add Habit Name")
        } else if (target === '') {
            alert("Please set target")   
        }
        else{

        }
    }
    return (
        <View style={styles.container}>
            <Header onPress={() => props.navigation.goBack(null)} title={"Add Habbit"} savePress={() => AddHabitToday()} />
            <View style={{ marginHorizontal: wp(5) }}>

                <InputField marginTop={wp(10)} borderText={"Habbit Name"}
                    value={HabitName}
                    onChangeText={(HabitName) => setHabitName(HabitName)} />
                <Text style={{ fontSize: 15, color: Colors.Yellow, fontWeight: "bold", marginBottom: -3, marginTop: wp(5) }}>Set Target</Text>
                <InputField placeholder={"set your target"}
                    value={target}
                    onChangeText={(target) => setTarget(target)} />
            </View>
        </View>
    )
}

export default AddHabit;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.White
    }
})
