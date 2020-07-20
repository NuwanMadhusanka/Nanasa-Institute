/* eslint-disable prettier/prettier */
import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import profileStack from '../profileStack';
import Login from '../../screens/login';
import studentStack from './studentStack';



const TabNavigationStudent = createBottomTabNavigator({
    Home: {
        screen: profileStack,
    },
    Notes: {
        screen: studentStack,
    },
    Login: {
        //label: null,
        screen: Login,
        navigationOptions: {
            title: 'Logout',
            header: null,
            tabBarVisible: false,
            // showLabel: false,
        },
    }
});

export default createAppContainer(TabNavigationStudent);

