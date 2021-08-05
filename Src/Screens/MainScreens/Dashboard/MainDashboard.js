import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'

import DashboardTopBar from '../../../Navigation/TopBar/DashboardTopBar';
import Header from '../../../Components/Header';

export default function MainDashboard(props) {
    return (
        <View style={styles.container}>
            <Header onPress={() => props.navigation.goBack(null)} title={"Dashboard"} />
            <DashboardTopBar />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
})
