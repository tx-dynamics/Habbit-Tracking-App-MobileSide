import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import React from 'react'

import ChatHead from '../../Screens/MainScreens/Community/ChatHead'
import ChatScreenCompany from '../../Screens/MainScreens/Community/ChatScreenCompany'
import ChatScreenDepartment from '../../Screens/MainScreens/Community/ChatScreenDepartment'
import { Colors } from '../../Constants/Colors';

const Tab = createMaterialTopTabNavigator();

const ChatTopBar = () => {
    return (
        <Tab.Navigator tabBarOptions={{
            activeTintColor: Colors.Yellow,
            inactiveTintColor: "#bbb",
            labelStyle: { fontWeight: "bold" },
            indicatorStyle: { backgroundColor: Colors.Yellow }
        }}>
            {/* <Tab.Screen name="ALL" component={ChatHead} /> */}
            <Tab.Screen name="ALL" component={ChatScreenCompany} />
            <Tab.Screen name="POD" component={ChatScreenDepartment} />
        </Tab.Navigator>
    );
}
export default ChatTopBar;