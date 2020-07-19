/* eslint-disable prettier/prettier */
import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import profileStack from '../profileStack';
import adminStack from '../adminStack';
import Login from '../../screens/login';


const TabNavigationAdmin = createBottomTabNavigator({
    Home: {
        screen: profileStack,
    },
    Instructor: {
        screen: adminStack,
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

export default createAppContainer(TabNavigationAdmin);

