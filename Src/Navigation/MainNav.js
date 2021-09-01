import 'react-native-gesture-handler';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native';

import Splash from '../Screens/Splash'
import AuthStack from './Stack/AuthStack';
import ProfileStack from './Stack/ProfileStack';
import BottomTab from './BottomNav/BottomTab';
import { connect } from 'react-redux'

const Stack = createStackNavigator();

function MainNav(props) {
    useEffect(() => { setTimeout(() => { setTimePassed(true) }, 2000) })
    const [timePassed, setTimePassed] = useState(false);
    return (
        <>
            <StatusBar backgroundColor={'#fff'}
                barStyle={'dark-content'} />
            {!timePassed ?
                <Splash />
                :
                <NavigationContainer>
                    <Stack.Navigator screenOptions={{ headerShown: false }}>
                        {props.isLogin ?
                            <>
                                <Stack.Screen name="BottomTab" component={BottomTab} />
                                <Stack.Screen name="ProfileStack" component={ProfileStack} />
                            </>
                            :
                            <Stack.Screen name="AuthStack" component={AuthStack} />
                        }
                    </Stack.Navigator>
                </NavigationContainer>
            }
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        isLogin: state.AuthReducer.isLogin
    }
}
export default connect(mapStateToProps, null)(MainNav);