/* eslint-disable prettier/prettier */
import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Profile from '../screens/profile';
import ProfileUpdate from '../screens/profileUpdate';
import Header from '../shared/header';



const screens = {
    Profile: {
        screen: Profile,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: () => <Header navigation={navigation} title="Profile" />
            }
        }
    },
    ProfileUpdate: {
        screen: ProfileUpdate,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: () => <Header navigation={navigation} title="Profile Update" />
            }
        }
    }
}

const ProfileStack = createStackNavigator(screens);



export default createAppContainer(ProfileStack);