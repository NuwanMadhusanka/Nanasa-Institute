/* eslint-disable prettier/prettier */
import { createStackNavigator } from 'react-navigation-stack';
import AdminHome from '../../screens/admin/adminHome';
import InstructorRegister from '../../screens/admin/instructorRegister';
import { createAppContainer } from 'react-navigation';


const screens = {
    AdminHome: {
        screen: AdminHome,
        navigationOptions: {
            title: 'Instructor Details'
        }
    },
    InstructorRegister: {
        screen: InstructorRegister,
        navigationOptions: {
            title: 'Instructor Register'
        }
    },
}

const AdminStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        //headerTintColor: '#444',
        //headerStyle: { backgroundColor: 'eee', height: 60 }
    }
});

export default createAppContainer(AdminStack);