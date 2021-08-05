import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import React from 'react'
import { Colors } from '../../Constants/Colors';

import ChatHead from '../../Screens/MainScreens/Community/ChatHead'
import Individual from '../../Screens/MainScreens/Dashboard/Individual';
import Habits from '../../Screens/MainScreens/Dashboard/Habits';
import POD from '../../Screens/MainScreens/Dashboard/POD';
import ALL from '../../Screens/MainScreens/Dashboard/ALL';
import DateTopBar from '../TopBar/DateTopBar';


const Tab = createMaterialTopTabNavigator();

const ChatTopBar = () => {
    return (
        <Tab.Navigator tabBarOptions={{
            activeTintColor: Colors.Yellow,
            inactiveTintColor: "#bbb",
            labelStyle: {
                fontSize: 12,
                fontWeight: "bold"
            },
            indicatorStyle: {
                backgroundColor: Colors.Yellow,
            }
        }}>
            <Tab.Screen name="ALL" component={DateTopBar} />
            <Tab.Screen name="POD" component={POD} />
            <Tab.Screen name="Individual" component={Individual} />
            <Tab.Screen name="Habits" component={Habits} />
        </Tab.Navigator>
    );
}
export default ChatTopBar;