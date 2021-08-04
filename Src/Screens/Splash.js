import React from 'react'
import { View, Text, StyleSheet, Image, StatusBar } from 'react-native'

import { Colors } from '../Constants/Colors';
import { iconPath } from '../Constants/icon';
import { wp } from '../Helpers/Responsiveness';

const Splash = () => {
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={Colors.Yellow} />
            <Image source={iconPath.WHITELOGO} style={{width:wp(65), height:wp(65), resizeMode:"contain"}}></Image>
        </View>
    )
}
export default Splash;
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: Colors.Yellow,
        justifyContent:"center",
        alignItems:"center"
    }
})