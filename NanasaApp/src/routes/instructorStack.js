/* eslint-disable prettier/prettier */
import { createStackNavigator } from 'react-navigation-stack';
import InstructorHome from '../screens/instructor/instructorHome';
import InstructorNotesAdd from '../screens/instructor/instructorNotesAdd';


const screens = {
    InstructorHome: {
        screen: InstructorHome,
        navigationOptions: {
            title: 'Instructor Home Page'
        }
    },
}

const InstructorStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        //headerTintColor: '#444',
        //headerStyle: { backgroundColor: 'eee', height: 60 }
    }
});

export default InstructorStack;