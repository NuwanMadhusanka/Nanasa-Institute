/* eslint-disable prettier/prettier */
import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import profileStack from '../profileStack';
import adminStack from './adminStack';
import Login from '../../screens/login';
import auth from '@react-native-firebase/auth';
import { AsyncStorage } from 'react-native';
import { StackActions } from 'react-navigation';


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

export default createAppContainer(TabNavigationAdmin);

