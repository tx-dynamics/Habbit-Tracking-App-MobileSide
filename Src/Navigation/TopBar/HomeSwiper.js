import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import React from 'react'
import { Colors } from '../../Constants/Colors';

import Today from '../../Screens/MainScreens/Home/Today';
import Yesterday from '../../Screens/MainScreens/Home/Yesterday';
import Tomorrow from '../../Screens/MainScreens/Home/Tomorrow';


const Tab = createMaterialTopTabNavigator();

const HomeSwiper = () => {
    return (
        <Tab.Navigator 
        initialRouteName="Today"
        backBehavior="initialRoute"
        tabBarOptions={{
            activeTintColor: Colors.Yellow,
            inactiveTintColor: "#bbb",
            showLabel: false,
            tabStyle: {
                height:0,
                borderColor: "transparent",
            },
            style: {
                elevation: 0,
                shadowColor: "#000000",
                shadowOffset: { width: 0, height: 10 },
                shadowOpacity: 0,
                shadowRadius: 6
              },
            indicatorStyle: {
                backgroundColor: "transparent",
            }
        }}>
            <Tab.Screen name="Yesterday" component={Yesterday} />
            <Tab.Screen name="Today" component={Today} />
            <Tab.Screen name="Tomorrow" component={Tomorrow} />
        </Tab.Navigator>
    );
}
export default HomeSwiper;


