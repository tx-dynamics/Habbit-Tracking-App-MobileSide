import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import React from 'react'
import { View, Text } from 'react-native'

import ChatHead from '../../Screens/MainScreens/Community/ChatHead'

const ChatTopBar2 = () => {
    return (
        <View>
            <Text>sdss</Text>
        </View>
    )
}
const ChatTopBar1 = () => {
    return (
        <View>
            <Text>sdsds</Text>
        </View>
    )
}


const Tab = createMaterialTopTabNavigator();

const ChatTopBar = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="ALL" component={ChatHead} />
            <Tab.Screen name="POD" component={ChatTopBar1} />
        </Tab.Navigator>
    );
}
export default ChatTopBar;