/* eslint-disable prettier/prettier */
import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import AdminStack from './adminStack';
import InstructorStack from './instructorStack';
import StudentStack from './studentStack';
import Login from '../screens/login';
import Header from '../shared/header';
import InstructorRegister from '../screens/admin/instructorRegister';
import InstructorNotesAdd from '../screens/instructor/instructorNotesAdd';



const screens = {
    Login: {
        screen: Login,
        navigationOptions: {
            header: null //this will hide the header
        },
    },
    Admin: {
        screen: AdminStack,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: () => <Header navigation={navigation} title="Admin Panel" />
            }
        }
    },
    Instructor: {
        screen: InstructorStack
    },
    Student: {
        screen: StudentStack
    },
    InstructorRegister: {
        screen: InstructorRegister,
        navigationOptions: {
            title: 'Instructor Register'
        }
    },
    InstructorNotesAdd: {
        screen: InstructorNotesAdd,
        navigationOptions: {
            title: 'Notes Add'
        }
    },

}

const LoginStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerTintColor: '#444',
        headerStyle: { backgroundColor: 'eee', height: 60 }
    }
});


export default createAppContainer(LoginStack);
