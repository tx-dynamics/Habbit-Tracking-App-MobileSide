import React from 'react'
import { View, Text } from 'react-native'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Today from '../../Screens/MainScreens/Home/Today'
import HomeStack from '../Stack/HomeStack';
import CommunityStack from '../Stack/CommunityStack';
import ChatTopBar from '../TopBar/ChatTopBar';
import MainCommunity from '../../Screens/MainScreens/Community/MainCommunity';
import MainDashboard from '../../Screens/MainScreens/Dashboard/MainDashboard';
import { Colors } from '../../Constants/Colors';
import Fonticon from '../../Constants/FontIcon';
import { wp } from '../../Helpers/Responsiveness';


const BottomTab1 = () => {
    return (
        <View>
            <Text>2</Text>
        </View>
    )
}
const BottomTab2 = () => {
    return (
        <View>
            <Text>3</Text>
        </View>
    )
}



const Tab = createBottomTabNavigator();

const BottomTab = () => {
    return (
        <Tab.Navigator tabBarOptions={{
            showLabel: false,
            keyboardHidesTabBar: true,
            tabStyle: [{ backgroundColor: Colors.Yellow, height: wp(15) ,}],
        }} screenOptions={{ headerShown: false }}>
            <Tab.Screen name="HomeStack" component={HomeStack}
                options={{ tabBarIcon: ({ focused }) => (<Fonticon type={"Entypo"} name={"home"} size={wp(7)} color={focused ? '#000' : '#fff'} />) }} />
            <Tab.Screen name="CommunityStack" component={CommunityStack}
                options={{ tabBarIcon: ({ focused }) => (<Fonticon type={"Ionicons"} name={"chatbubble-ellipses-sharp"} size={wp(7)} color={focused ? '#000' : '#fff'} />) }} />
            <Tab.Screen name="MainDashboard" component={MainDashboard}
                options={{ tabBarIcon: ({ focused }) => (<Fonticon type={"MaterialIcons"} name={"dashboard"} size={wp(7)} color={focused ? '#000' : '#fff'} />) }} />

        </Tab.Navigator>
    );
}
export default BottomTab;