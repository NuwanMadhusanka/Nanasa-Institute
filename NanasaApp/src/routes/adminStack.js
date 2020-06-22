import { createStackNavigator } from 'react-navigation-stack';
import AdminHome from '../screens/admin/adminHome';


const screens = {
    AdminHome: {
        screen: AdminHome,
        navigationOptions: {
            title: 'Admin Home Page'
        }
    },
}

const AdminStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        //headerTintColor: '#444',
        //headerStyle: { backgroundColor: 'eee', height: 60 }
    }
});

export default AdminStack;