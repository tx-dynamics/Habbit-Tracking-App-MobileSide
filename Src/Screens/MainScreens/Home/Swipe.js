import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'

import HomeSwiper from '../../../Navigation/TopBar/HomeSwiper';
import Header from '../../../Components/Header';

export default function Swipe(props) {
    return (
        <View style={styles.container}>
            <HomeSwiper />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
})
