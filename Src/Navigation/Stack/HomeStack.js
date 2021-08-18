import 'react-native-gesture-handler';
import * as React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import Today from '../../Screens/MainScreens/Home/Today';
import Swipe from '../../Screens/MainScreens/Home/Swipe';
import Yesterday from '../../Screens/MainScreens/Home/Yesterday';
import Tomorrow from '../../Screens/MainScreens/Home/Tomorrow';
import AddHabit from '../../Screens/MainScreens/Home/AddHabit';
const Stack = createStackNavigator();

function AuthStack(props) {
    return (
        <>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Swipe" component={Swipe} />
                <Stack.Screen name="Today" component={Today} />
                <Stack.Screen name="Yesterday" component={Yesterday} />
                <Stack.Screen name="Tomorrow" component={Tomorrow} />
                <Stack.Screen name="AddHabit" component={AddHabit} />
            </Stack.Navigator>
        </>
    );
}
export default AuthStack;