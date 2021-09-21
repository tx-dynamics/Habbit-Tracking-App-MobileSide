import 'react-native-gesture-handler';
import * as React from 'react';
import { StatusBar } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../../Screens/Auth/Login';
import SignUp from '../../Screens/Auth/SignUp';
import LastStep from '../../Screens/Auth/LastStep';
import StartScreen from '../../Screens/Auth/StartScreen';
import ForgotPassword from '../../Screens/Auth/ForgotPassword';
const Stack = createStackNavigator();

function AuthStack(props) {
    return (
        <>
             {/* <StatusBar backgroundColor={'#fff'} />  */}
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="SignUp" component={SignUp} />
                <Stack.Screen name="LastStep" component={LastStep} />
                <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
                <Stack.Screen name="StartScreen" component={StartScreen} />
            </Stack.Navigator>
        </>
    );
}
export default AuthStack;