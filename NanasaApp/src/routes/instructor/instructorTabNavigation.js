/* eslint-disable prettier/prettier */
import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import InstructorHome from '../../screens/instructor/instructorHome';
import instructorNoteStack from './instructorNoteStack';
import profileStack from '../profileStack';
import Login from '../../screens/login';
import studentDataStack from './studentDataStack';



const TabNavigationInstructor = createBottomTabNavigator({
    Home: {
        screen: profileStack,
    },
    Notes: {
        screen: instructorNoteStack,
    },
    Students: {
        screen: studentDataStack,
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

export default createAppContainer(TabNavigationInstructor);

