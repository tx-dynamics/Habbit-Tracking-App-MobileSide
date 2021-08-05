import React from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { Colors } from '../../../Constants/Colors';
import { wp } from '../../../Helpers/Responsiveness';

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

const Habits = () => {
    return (
        <View style={styles.container}>
            <View style={{ marginHorizontal: wp(5) }}>

                <Text style={{ color: Colors.LightGray, marginTop: wp(5), alignSelf: "center" }}>
                    1 July 2021
             <Text style={{ color: Colors.Yellow }}> - 16 July -</Text>
               1 August 2021</Text>

                <Text style={{ color: Colors.Yellow, marginTop: wp(7), fontWeight: "bold" }}>Excercise (Top 3)</Text>
                <FlatList
                    data={P_Data}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (
                        <View style={{ marginTop: wp(8), flexDirection:"row" }}>
                            <Text>{item.name}</Text>
                            <Text style={{marginLeft:10, color:Colors.Yellow}}>{item.points}</Text>
                        </View>
                    )} />
                <Text style={{ color: Colors.Yellow, marginTop: wp(7), fontWeight: "bold" }}>Reading (Top 3)</Text>

                <FlatList
                    data={P_Data}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (
                        <View style={{ marginTop: wp(8), flexDirection:"row" }}>
                            <Text>{item.name}</Text>
                            <Text style={{marginLeft:10, color:Colors.Yellow}}>{item.points}</Text>
                        </View>
                    )} />
            </View>

        </View>
    )
}
export default Habits;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.White
    },
})
