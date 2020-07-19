/* eslint-disable prettier/prettier */
import { createStackNavigator } from 'react-navigation-stack';
import InstructorHome from '../screens/instructor/instructorHome';
import InstructorNotesAdd from '../screens/instructor/instructorNotesAdd';
import { createAppContainer } from 'react-navigation';
import BaseHome from '../screens/instructor/baseHome';


const screens = {
    Home: {
        screen: BaseHome,
        navigationOptions: {
            title: 'Instructor Home Page'
        }
    },

    InstructorHome: {
        screen: InstructorHome,
        navigationOptions: {
            title: 'Instructor Home Page'
        }
    },
    InstructorNotesAdd: {
        screen: InstructorNotesAdd,
        navigationOptions: {
            title: 'Notes Add'
        }
    },
}

const InstructorStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        //headerTintColor: '#444',
        //headerStyle: { backgroundColor: 'eee', height: 60 }
    }
});

export default createAppContainer(InstructorStack);