import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'

import ChatTopBar from '../../../Navigation/TopBar/ChatTopBar';
import Header from '../../../Components/Header';

export default function MainCommunity(props) {
    return (
        <View style={styles.container}>
            <Header onPress={() => props.navigation.goBack(null)} title={"Community"} />
            <ChatTopBar />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
})
