import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Header from '../../../Components/Header';
import { Colors } from '../../../Constants/Colors';
import { wp } from '../../../Helpers/Responsiveness';

export default function PrivacyPolicy(props) {
    return (
        <View style={styles.container}>
            <Header onPress={() => props.navigation.goBack(null)} title={"Privacy Policy"} />

            <Text style={{marginHorizontal:wp(5), marginVertical:wp(5), textAlign:"justify"}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.White
    },

})
