import 'react-native-gesture-handler';
import * as React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import Profile from '../../Screens/MainScreens/Profile/Profile';
import EditProfile from '../../Screens/MainScreens/Profile/EditProfile';
import Settings from '../../Screens/MainScreens/Profile/Settings';
import PrivacyPolicy from '../../Screens/MainScreens/Profile/PrivacyPolicy';
import HelpCenter from '../../Screens/MainScreens/Profile/HelpCenter';
import ChangePassword from '../../Screens/MainScreens/Profile/ChangePassword';
const Stack = createStackNavigator();

function ProfileStack(props) {
    return (
        <>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Profile" component={Profile} />
                <Stack.Screen name="EditProfile" component={EditProfile} />
                <Stack.Screen name="Settings" component={Settings} />
                <Stack.Screen name="ChangePassword" component={ChangePassword} />
                <Stack.Screen name="HelpCenter" component={HelpCenter} />
                <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
            </Stack.Navigator>
        </>
    );
}
export default ProfileStack;