import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import React from 'react'
import { Colors } from '../../Constants/Colors';

import Individual from '../../Screens/MainScreens/Dashboard/Individual';


const Tab = createMaterialTopTabNavigator();

const ChatTopBar = () => {
    return (
        <Tab.Navigator tabBarOptions={{
            activeTintColor: Colors.Yellow,
            inactiveTintColor: "#bbb",
            labelStyle: {
                fontSize: 12,
                // fontWeight: "bold"
            },
            indicatorStyle: {
                backgroundColor: Colors.Yellow,
            }
        }}>
            <Tab.Screen name="1 July 2021" component={Individual} />
            <Tab.Screen name="16 July " component={Individual} />
            <Tab.Screen name="1 august 2021" component={Individual} />
        </Tab.Navigator>
    );
}
export default ChatTopBar;