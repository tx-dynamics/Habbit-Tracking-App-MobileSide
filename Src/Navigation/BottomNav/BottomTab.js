import React from 'react'
import { View, StyleSheet, Platform } from 'react-native'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Today from '../../Screens/MainScreens/Home/Today'
import HomeStack from '../Stack/HomeStack';
import CommunityStack from '../Stack/CommunityStack';
import HomeSwiper from '../TopBar/HomeSwiper';
import ChatTopBar from '../TopBar/ChatTopBar';
import MainDashboard from '../../Screens/MainScreens/Dashboard/MainDashboard';
import { Colors } from '../../Constants/Colors';
import Fonticon from '../../Constants/FontIcon';
import { wp } from '../../Helpers/Responsiveness';
import { useSafeArea } from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
    const insets = useSafeArea()
    return (
        <Tab.Navigator tabBarOptions={{
            showLabel: false,
            // {Platform.OS === 'ios' ?
            keyboardHidesTabBar: Platform.OS === 'ios' ? false : true,
            style: {
            },
            tabStyle: {
            },


        }} screenOptions={{ headerShown: false, }}>
            <Tab.Screen name="HomeStack" component={HomeStack}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={[styles.bottomStyle, { borderTopLeftRadius: 20 }]}>
                            <Fonticon type={"Entypo"} name={"home"} size={wp(7)} color={focused ? '#000' : '#fff'} />
                        </View>
                    )
                }}
            />
            <Tab.Screen name="CommunityStack" component={CommunityStack}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.bottomStyle}>
                            <Fonticon type={"Ionicons"} name={"chatbubble-ellipses-sharp"} size={wp(7)} color={focused ? '#000' : '#fff'} />
                        </View>

                    )
                }} />
            <Tab.Screen name="MainDashboard" component={MainDashboard}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={[styles.bottomStyle, { borderTopRightRadius: 20 }]}>
                            <Fonticon type={"MaterialIcons"} name={"dashboard"} size={wp(7)} color={focused ? '#000' : '#fff'} />
                        </View>

                    )
                }} />

        </Tab.Navigator>
    );
}
export default BottomTab;

const styles = StyleSheet.create({
    bottomStyle: {
        backgroundColor: Colors.Yellow,
        flex: 1,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    }
})