import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';

import { wp } from '../../../Helpers/Responsiveness'
import { Colors } from '../../../Constants/Colors'
import { iconPath } from '../../../Constants/icon'
import HeadCard from './HeadCard';

CHAT_HEAD = [
    {
        id: "1",
        name: "Person Name",
        message: "hello",
        Image: iconPath.BLACKLOGO,
        unread_msgs: 6
    },
    {
        id: "2",
        name: "Person Name",
        message: "Let's Go",
        Image: iconPath.BLACKLOGO,
        unread_msgs: 2
    },
    {
        id: "3",
        name: "Person Name",
        message: "How are you",
        Image: iconPath.BLACKLOGO,
        unread_msgs: 1
    },
    {
        id: "4",
        name: "Person Name",
        message: "Thats Good",
        Image: iconPath.BLACKLOGO,
        unread_msgs: 12
    },
    {
        id: "5",
        name: "Person Name",
        message: "hello",
        Image: iconPath.BLACKLOGO,
    },
]

export default function ChatHead(props) {
    const chatHeadPress = (item) => {
        props.navigation.navigate("ChatScreen1",{item})
    }

    return (
        <View style={styles.container}>
            <View style={{ marginHorizontal: wp(4) }}>
                <FlatList
                    data={CHAT_HEAD}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (
                        <HeadCard item={item} onPress={() => chatHeadPress(item)} />
                    )} />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white
    }
})
