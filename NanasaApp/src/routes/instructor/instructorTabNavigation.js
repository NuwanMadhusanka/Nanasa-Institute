/* eslint-disable prettier/prettier */
import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import instructorNoteStack from './instructorNoteStack';
import profileStack from '../profileStack';
import Login from '../../screens/login';
import studentDataStack from './studentDataStack';
import auth from '@react-native-firebase/auth';
import { AsyncStorage } from 'react-native';
import { StackActions } from 'react-navigation';



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
            tabBarOnPress: ({ navigation }) => {
                navigation.dispatch(StackActions.popToTop());
                auth()
                    .signOut()
                    .then(() => {
                        console.log('User signed out!');
                        deleteUserId();
                        navigation.navigate('Login');
                    });
            },
        },
    }
});

const deleteUserId = async () => {
    try {
        console.log('Hello');
        await AsyncStorage.removeItem('userId');
        await AsyncStorage.removeItem('userNic');
        await AsyncStorage.removeItem('userRole');
    } catch (error) {
        // Error retrieving data
        console.log(error.message);
    }
}

export default createAppContainer(TabNavigationInstructor);

