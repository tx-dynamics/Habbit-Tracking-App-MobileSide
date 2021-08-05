import 'react-native-gesture-handler';
import * as React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import MainCommunity from '../../Screens/MainScreens/Community/MainCommunity';
import ChatScreen from '../../Screens/MainScreens/Community/ChatScreen';
const Stack = createStackNavigator();

function AuthStack(props) {
    return (
        <>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="MainCommunity" component={MainCommunity} />
                <Stack.Screen name="ChatScreen" component={ChatScreen} />
            </Stack.Navigator>
        </>
    );
}
export default AuthStack;