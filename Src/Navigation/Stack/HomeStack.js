import 'react-native-gesture-handler';
import * as React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import Today from '../../Screens/MainScreens/Home/Today';
import Yesterday from '../../Screens/MainScreens/Home/Yesterday';
import Tomorrow from '../../Screens/MainScreens/Home/Tomorrow';
const Stack = createStackNavigator();

function AuthStack(props) {
    return (
        <>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Today" component={Today} />
                <Stack.Screen name="Yesterday" component={Yesterday} />
                <Stack.Screen name="Tomorrow" component={Tomorrow} />
            </Stack.Navigator>
        </>
    );
}
export default AuthStack;